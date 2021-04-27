<template>
  <div>
    <el-upload
      ref="upload"
      :key="uploadFileKey"
      list-type="picture-card"
      style="width:520px"
      :limit="uploadLimit"
      :accept="mimeType"
      :data="uploadFileParams"
      :action="uploadFileUrl"
      :headers="headers"
      :name="imageData"
      :on-change="changeImageList"
      :on-success="onSuccess"
      :before-remove="beforeRemoveImage"
      :before-upload="beforeUpload"
      :multiple="multiple"
      :auto-upload="false"
      :file-list="fileList"
      :class="{'hide':hideUploadButton}"
    >
      <i slot="default" class="el-icon-plus" />
      <div slot="file" slot-scope="{file}">
        <img
          class="el-upload-list__item-thumbnail"
          :src="file.url"
          alt=""
        >
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in" />
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete" />
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { requestHeader, accepts as imgMimeType } from '@/utils/commen/uploadValidate'
import { validateUploadResult } from './index-helper'
export default {
  props: {
    uploadFileParams: {
      required: true,
      type: Object
    },
    uploadFileUrl: {
      required: true,
      type: String
    },
    uploadLimit: {
      required: false,
      type: Number,
      default: () => {
        return 10
      }
    },
    multiple: {
      required: false,
      type: Boolean,
      default: () => {
        return false
      }
    },
    onSuccess: {
      type: Function,
      required: false,
      default: () => {
        return () => {

        }
      }
    },
    beforeUpload: {
      type: Function,
      required: false,
      default: () => {
        return () => {
        }
      }
    },
    imageData: {
      required: false,
      type: String,
      default: () => {
        return 'image_data'
      }
    },
    fileList: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    }

  },
  data() {
    return {
      uploadFileKey: 0,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      // 图片上传相关
      headers: requestHeader(),
      mimeType: imgMimeType,
      hideUploadButton: false
    }
  },
  created() {
    if (this.fileList.length >= this.uploadLimit) {
      this.hideUploadButton = true
    }
  },
  methods: {
    handleRemove(file) {
      this.$refs.upload.handleRemove(file)
      this.$emit('removeImage', file)
    },
    beforeRemoveImage(file, fileList) {
      this.hideUploadButton = false
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    changeImageList(file, fileList) {
      if (fileList.length >= this.uploadLimit) {
        this.hideUploadButton = true
      }
      const uploadValidateResult = fileList.some(item => {
        if (Object.prototype.hasOwnProperty.call(item, 'raw')) {
          return validateUploadResult(item.raw)
        }
      })
      if (!uploadValidateResult) {
        this.uploadFileKey += 1
        this.$emit('imageIsValidateSuccess', uploadValidateResult)
      } else {
        this.$emit('imageIsValidateSuccess', { fileList, uploadValidateResult })
      }
    },
    submit() {
      this.$refs.upload.submit()
    }
  }
}
</script>
<style>
  .hide .el-upload.el-upload--picture-card{
    display: none;
  }
</style>
<style lang="scss" scoped>
 @import './index.scss';
</style>
