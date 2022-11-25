const functions = require('firebase-functions')
const puppeteer = require('puppeteer')

const options = {
  timeoutSeconds: 300,
  memory: '1GB',
}

exports.generatePdf = functions.runWith(options).https.onRequest(
  async(req, res) => {
    if (req.method === 'OPTIONS') {
      res.set('Access-Control-Allow-Headers', 'authorization,content-type')
      res.set('Access-Control-Allow-Origin', '*')
      res.status(204).send('')
    }
    else {
      res.set('Access-Control-Allow-Origin', '*')
    }

    const body = req.body
    if (!body || !body.data || Object.keys(body.data).length === 0) res.status(400).send()
    const fileName = body.fileName ? body.fileName : 'cv'
    const data = body.data

    // launch puppeteer in headless mode and without sandbox
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none'] })

    try {
      const page = await browser.newPage()
      await page.goto('https://develop-cvicream.netlify.app', { waitUntil: 'networkidle2' })
      await page.evaluate((data) => {
        localStorage.setItem('cvicream', JSON.stringify(data))
        localStorage.setItem('cvicream-status', JSON.stringify({ isEditing: true }))
      }, data)
      await page.goto('https://develop-cvicream.netlify.app/edit/about', { waitUntil: 'networkidle2' })
      await page.emulateMediaType('print')
      const pdf = await page.pdf({
        printBackground: true,
        format: 'A4',
      })

      res.setHeader('Content-Type', 'application/pdf')
      res.setHeader('Content-Disposition', `attachment; filename=${encodeURIComponent(fileName)}.pdf`)
      res.send(pdf)
    }
    catch (error) {
      console.error(error)
    }

    await browser.close()
  })
