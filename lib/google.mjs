import { google } from 'googleapis'

const CLIENT_ID = '439377719543-6ehk55r7tg4e8g72fetp4fne44mle3pm.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04Cppk4YWdR04CgYIARAAGAQSNwF-L9Ir7MFQUL0AJh52EOfUJ9Mxr4vntXjFHbHTtZ5HOlLxgtU1CCV6yEF6ekUtMtrMMtfTOjc'

var status = 0

const authOAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

export function getAuth() {
  if (!status) {
    status = 1
    authOAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
  }
  return authOAuth2Client
}

export function authJWT(client_email, private_key) {
  return new google.auth.JWT(
    client_email,
    null,
    private_key,
    ["https://www.googleapis.com/auth/drive"]
  )
}

export function auth(data) {
  return new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
}

// await jwtClient.authorize()
//  return jwtClient

export const drive = {
  uploadFile(auth, parentId, media, cb) {
    return google.drive({ version: 'v3', auth }).files.create({
      resource: {
        name: 'test.txt',
        parents: [parentId],
      },
      media,
      fields: 'id',
    }, cb)
  }
}