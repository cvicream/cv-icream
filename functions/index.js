const functions = require('firebase-functions')
const puppeteer = require('puppeteer')

const options = {
  timeoutSeconds: 300,
  memory: '1GB',
}

exports.generatePdf = functions.runWith(options).https.onRequest(async(req, res) => {
  const body = req.body
  if (!body || !body.data || Object.keys(body.data).length === 0) res.status(400).send()
  const fileName = body.fileName ? body.fileName : 'cv'
  const data = body.data

  // Remember that in Firebase you need to launch Puppeteer in headless mode and without sandbox
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] })

  // Opening new page
  const page = await browser.newPage()

  // Open URL in current page
  await page.goto('https://develop-cvicream.netlify.app', { waitUntil: 'networkidle2' })

  await page.evaluate((data) => {
    localStorage.setItem('cvicream', JSON.stringify(data))
    localStorage.setItem('cvicream-status', JSON.stringify({ isEditing: true }))
  }, data)

  await page.goto('https://develop-cvicream.netlify.app/edit/about', { waitUntil: 'networkidle2' })

  // To reflect CSS used for screens instead of print
  await page.emulateMediaType('print')

  // Download the PDF
  const pdf = await page.pdf({
    printBackground: true,
    format: 'A4',
  })

  // Closing the browser
  await browser.close()

  // Sending response
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', `attachment; filename=${fileName}.pdf`)
  res.send(pdf)
})
