import { ref } from 'vue'
import { ElMessage, UploadFile, UploadUserFile } from 'element-plus'
import { uploadImageApi } from '@/api/course/index'
export default function useUpload() {
    //Reference to the image upload component
    const uploadRef = ref()
    //URL for the image preview
    const dialogImageUrl = ref('')
    //Flag to indicate if the preview is clicked
    const dialogVisible = ref(false)
    //Flag to indicate if the upload is disabled
    const disabled = ref(false)
    //List of uploaded files
    const fileList = ref<UploadUserFile[]>([])
    //URL of the uploaded image
    const imgurl = ref('');

    //remove image
    const handleRemove = (file: UploadFile) => {
        console.log(file)
        console.log(fileList.value)
        fileList.value = fileList.value.filter(item => item.name != file.name)
    }

    //preview of the image
    const handlePictureCardPreview = (file: UploadFile) => {
        dialogImageUrl.value = file.url!
        dialogVisible.value = true
    }

    //img upload
    const uploadFile = async (file: any) => {
        //check if the file is an image
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