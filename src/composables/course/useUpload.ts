import { ref } from 'vue'
import { ElMessage, UploadFile, UploadUserFile } from 'element-plus'
import { uploadImageApi } from '@/api/course/index'
export default function useUpload() {
    //图片上传组件ref属性
    const uploadRef = ref()
    //图片预览地址
    const dialogImageUrl = ref('')
    //是否点击预览
    const dialogVisible = ref(false)
    const disabled = ref(false)
    //上传的文件
    const fileList = ref<UploadUserFile[]>([])
    //上传图片的地址
    const imgurl = ref('');

    //remove image
    const handleRemove = (file: UploadFile) => {
        console.log(file)
        console.log(fileList.value)
        fileList.value = fileList.value.filter(item => item.name != file.name)
    }

    //点击预览图片
    const handlePictureCardPreview = (file: UploadFile) => {
        dialogImageUrl.value = file.url!
        dialogVisible.value = true
    }

    //图片上传
    const uploadFile = async (file: any) => {
        //判断是不是图片
        const typeArr = ["image/png", "image/gif", "image/jpeg", "image/jpg"];
        const isImg = typeArr.indexOf(file.raw.type) !== -1;
        const isMore5M = file.size / 1024 / 1024 < 5;
        if (!isImg) {
            ElMessage.warning("Only image can be uploaded!");
            uploadRef.value?.clearFiles()
            return;
        }
        if (!isMore5M) {
            ElMessage.warning("Image size can not be larger than 5M!");
            uploadRef.value?.clearFiles()
            return;
        }

        //data commit
        const formData = new FormData();
        formData.append("file", file.raw);
        let res = await uploadImageApi(formData);
        if (res && res.code == 200 && res.data) {
            console.log(res.data)
            imgurl.value = res.data;
            ElMessage.success("Image uploading success!");
        }
    }
    return {
        dialogImageUrl,
        dialogVisible,
        disabled,
        handleRemove,
        handlePictureCardPreview,
        fileList,
        uploadFile,
        uploadRef,
        imgurl
    }
}