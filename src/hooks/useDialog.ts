import { DialogModel } from '@/type/BaseType'
import { reactive } from 'vue';
export default function useDialog() {
    //define dialog attribute
    const dialog = reactive<DialogModel>({
        visible: false,
        title: 'Titile',
        height:280,
        width:630
    });

    //show
    const onShow = () => {
        dialog.visible = true;
    }

    //close
    const onClose = () => {
        dialog.visible = false;
    }

    //confirm
    const onConfirm = () => {
        dialog.visible = false;
    }
    return{
        dialog,
        onShow,
        onClose,
        onConfirm
    }

}