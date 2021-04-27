
import { isImage, isVideo, validateUploadFileSize } from '@/utils/commen/uploadValidate'
import { Message } from 'element-ui'
export const validateUploadResult = (file) => {
  if (!isImage(file.type)) {
    Message.error({
      showClose: true,
      message: '请上传图片类型的文件',
      type: 'error'
    })
  }
  if (!validateUploadFileSize(file.size, 5)) {
    Message.error({
      showClose: true,
      message: '图片大小不能超过5M',
      type: 'error'
    })
  }
  return isImage(file.type) && validateUploadFileSize(file.size, 5)
}
export const validateVideoResult = (file) => {
  console.log(file)
  if (!isVideo(file.type)) {
    Message.error({
      showClose: true,
      message: '请上传视频类型的文件',
      type: 'error'
    })
  }
  return isVideo(file.type)
}
