<template>
    <div class="container">
      <div id="reader"></div>
    </div>
  </template>
  
  
  <script setup lang="ts">
  import {onMounted, onUnmounted, ref} from 'vue';
  import {useRouter} from 'vue-router';
  import {Html5Qrcode} from 'html5-qrcode';
  import {
    Html5QrcodeResult,
    CameraDevice
  } from '@/views/scan/interface.ts';
  import {enter} from "@/api/history";
  import {ElMessage} from "element-plus";
  
  
  let cameraId = ref('');
  let devicesInfo = ref<any>('');
  let html5QrCode = ref<any>(null);
  const router = useRouter();
  
  
  onMounted(() => {
    console.log(1)
    getCameras();
  });
  
  
  onUnmounted(() => {
    stop();
  });
  
  
  const getCameras = () => {
    Html5Qrcode.getCameras()
        .then((devices: CameraDevice[]) => {
          console.log('Camera Information', devices);
          if (devices && devices.length) {
            // If there are 2 cameras, 1 is the front
            if (devices.length > 1) {
              cameraId.value = devices[1].id;
            } else {
              cameraId.value = devices[0].id;
            }
            devicesInfo.value = devices;
            // start scan
            start();
          }
        })
        .catch((err) => {
          // handle err
          console.log('Failed to get device information', err); 
        });
  };
  const start = () => {
    html5QrCode = new Html5Qrcode('reader');
    html5QrCode
        .start(
            cameraId.value, // retreived in the previous step.
            {
              fps: 0.5, // Set how many frames per second
              qrbox: {width: 400, height: 400}, // Setting the viewfinder range
              // scannable, rest shaded.
            },
            (decodedText: string, decodedResult: Html5QrcodeResult) => {
              console.log('Result of scan', decodedText, decodedResult);
              enter(decodedText).then(res => {
                ElMessage.success("Scan success!");
              })
            },
            (errorMessage: any) => {
              console.log('No result', errorMessage);
            }
        )
        .catch((err: any) => {
          // Start failed, handle it. For example,
          console.log(`Unable to start scanning, error: ${err}`);
        });
  };
  const stop = () => {
    html5QrCode
        .stop()
        .then((ignore: any) => {
          // QR Code scanning is stopped.
          console.log('QR Code scanning stopped.', ignore);
        })
        .catch((err: any) => {
          // Stop failed, handle it.
          console.log('Unable to stop scanning.', err);
        });
  };
  </script>
  
  
  <style lang="scss" scoped>
  .container {
    position: relative;
    height: 100%;
    width: 100%;
    background: rgba($color: #000000, $alpha: 0.48);
  }
  
  
  #reader {
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
  </style>