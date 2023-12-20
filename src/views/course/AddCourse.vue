<template>
    <SysDialog :title="dialog.title" :width="dialog.width" :height="dialog.height" :visible="dialog.visible"
        @onClose="onClose" @onConfirm="commit">

        <template v-slot:content>
            <el-form :model="addModel" ref="addFormRef" :rules="rules" label-width="80px" size="default">
                <el-row>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="courseName" label="Name">
                            <el-input v-model="addModel.courseName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="courseHour" label="Hours">
                            <el-input v-model="addModel.courseHour"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="coursePrice" label="Price">
                            <el-input v-model="addModel.coursePrice"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="teacherName" label="Coach">
                            <el-select style="width:100%;" v-model="addModel.teacherName" class="m-2"
                                placeholder="Choose a coach" size="default" @change="selectTeach">
                                <el-option v-for="item in teacherData.list" :key="item.label" :label="item.label"
                                    :value="{value:item.value, label:item.label}" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12" :offset="0">
                        <el-form-item label-width="130px" prop="image" label="Course image">
                            <el-upload ref="uploadRef" action="#" :on-change="uploadFile" :auto-upload="false" :limit="1"
                                :file-list="fileList" list-type="picture-card">
                                <el-icon>
                                    <Plus />
                                </el-icon>
                                <template #file="{ file }">
                                    <div>
                                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                                        <span class="el-upload-list__item-actions">
                                            <span class="el-upload-list__item-preview"
                                                @click="handlePictureCardPreview(file)">
                                                <el-icon><zoom-in /></el-icon>
                                            </span>
                                            <span v-if="!disabled" class="el-upload-list__item-delete"
                                                @click="handleRemove(file)">
                                                <el-icon>
                                                    <Delete />
                                                </el-icon>
                                            </span>
                                        </span>
                                    </div>
                                </template>
                            </el-upload>
                            <el-dialog v-model="dialogVisible">
                                <img w-full :src="dialogImageUrl" alt="Preview Image" />
                            </el-dialog>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-form-item prop="courseDetails" label="Details">
                    <div style="border: 1px solid #ccc">
                        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                            :mode="mode" />
                        <Editor style="height: 300px; overflow-y: hidden" v-model="valueHtml" :defaultConfig="editorConfig"
                            :mode="mode" @onCreated="handleCreated" />
                    </div>
                </el-form-item>
            </el-form>
        </template>

    </SysDialog>
</template>

<script setup lang="ts">
import { CourseType } from '@/api/course/CourseModel';
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import { ElMessage, FormInstance } from 'element-plus';
import { nextTick, reactive, ref } from 'vue';
import useUpload from '@/composables/course/useUpload';
import useEditor from '@/composables/course/useEditor';
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import useSelectTeacher from '@/composables/course/useSelectTeacher';
import { EditType, Title } from '@/type/BaseEnum';
import { addApi, editApi } from '@/api/course';
import useInstance from '@/hooks/useInstance';

const { global } = useInstance()

//Dialog props
const { dialog, onClose, onShow, onConfirm } = useDialog()

//teacher selection
const { teacherData, listTeacher } = useSelectTeacher()

//image uploading
const {
    uploadRef,
    dialogImageUrl,
    dialogVisible,
    disabled,
    handleRemove,
    handlePictureCardPreview,
    fileList,
    uploadFile,
    imgurl
} = useUpload();

//text editor
const {
    editorRef,
    handleCreated,
    mode,
    editorConfig,
    valueHtml,
    toolbarConfig, } = useEditor()

//表单的Ref属性
const addFormRef = ref<FormInstance>()

//show dialog
const show = async (type: string, row?: CourseType) => {
    //get coach list
    await listTeacher()
    //dialog props
    type == EditType.ADD
        ? (dialog.title = Title.ADD)
        : (dialog.title = Title.EDIT);
    dialog.width = 900;
    //clear image and text editor
    const upload = uploadRef.value;
    if (upload) {
        upload.clearFiles()
    }
    addModel.image = ''
    const editor = editorRef.value;
    if (editor) {
        editor.clear()
    }
    addModel.courseDetails = ''

    //Edit
    if (type == EditType.EDIT) {
        nextTick(() => {
            //Set data into dialog
            global.$objCopy(row, addModel);
            //text editor 
            valueHtml.value = addModel.courseDetails;
            //image
            if (row?.image) {
                let obj = {
                    name: '',
                    url: '',
                };
                obj.url = row.image;
                fileList.value.push(obj);
            }
        });
    }
    onShow();
    //clear dialog
    addFormRef.value?.resetFields()
    addModel.type = type;
}

//expose for othera
defineExpose({
    show
})

//Dialog data object
const addModel = reactive<CourseType>({
    type: '',
    courseId: '',
    courseName: '',
    image: '',
    teacherName: '',
    teacherId: '',
    courseHour: 0,
    courseDetails: '',
    coursePrice: 0
})

//code form Elmentplus website
const validateCourseHour = (rule: any, value: any, callback: any) => {
    if (value === 0 || value < 0) {
        callback(new Error('Please input the course hour'))
    } else {
        callback()
    }
}

const validateCoursePrice = (rule: any, value: any, callback: any) => {
    if (value === 0 || value < 0) {
        callback(new Error('Please input the course price'))
    } else {
        callback()
    }
}

//Dialog validation
const rules = reactive({
    courseName: [{
        required: true,
        trigger: 'blur',
        message: 'Enter a course name'
    },],

    courseHour: [{
        required: true,
        validator: validateCourseHour,
        trigger: 'blur'
    },],

    coursePrice: [{
        required: true,
        validator: validateCoursePrice,
        trigger: 'blur'
    },],

    teacherName: [{
        required: true,
        trigger: 'blur',
        message: 'Choose a coach'
    },],

    image: [{
        required: true,
        trigger: 'blur',
        message: 'Choose a file to upload'
    },],

    courseDetails: [{
        required: true,
        trigger: 'blur',
        message: 'Enter course details'
    },],
})

//register event
const emits = defineEmits(['reFresh'])

//commit
const commit = () => {
    //image path
    console.log(process.env.BASE_API)
    addModel.image = process.env.BASE_API + imgurl.value;

    //course details
    addModel.courseDetails = valueHtml.value;
    addFormRef.value?.validate(async (valid) => {
        if (valid) {
            let res = null;
            if (addModel.type == EditType.ADD) {
                res = await addApi(addModel)
            } else {
                res = await editApi(addModel)
            }
            if (res && res.code == 200) {
                ElMessage.success(res.msg)
                emits('reFresh')
                onClose()
            }
        }
    })
};

//select coach's change
const selectTeach = (val:any) =>{
    console.log(val)
    addModel.teacherId = val.value;
    addModel.teacherName = val.label;
}

</script>


<style scoped></style>