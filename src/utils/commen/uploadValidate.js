import { getToken } from '../auth'

export const accepts = 'image/png, image/jpeg, image/jpg'
export const isImage = (fileType) => {
  return fileType && accepts.includes(fileType)
}
export const validateUploadFileSize = (fileSize, limitSize) => {
  return fileSize / 1024 / 1024 < limitSize
}

export const requestHeader = function() {
  return {
    'authorization': getToken()
  }
}
