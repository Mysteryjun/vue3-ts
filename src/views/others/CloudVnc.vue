<template>
  <div>
    <div style="width:100%;height:800px" id="iframeWin"></div>
  </div>
</template>

<script setup >
import {getCurrentInstance,onMounted} from "vue";
import CloudPlatformHelper from "@/utils/vnc"
import { getRemoteControl , getPlatformStragety } from "@/api/test";
const { proxy }  = getCurrentInstance();
console.log(proxy);
let {deviceUuid,vmId,platformId} = proxy.$route.query;
console.log(deviceUuid,vmId,platformId);
onMounted(()=>{
  init(deviceUuid,vmId,platformId);
})



const getStragety = async platformId =>{
  let stragety;
  await getPlatformStragety({platformId:platformId}).then(res=>{
    console.log(res);
    stragety = res.stragety;    
  }).catch(err=>{
    console.log(err);
  })
  return stragety;
  
}
const init = async (deviceUuid,vmId,platformId)=>{
  let param;
    // console.log(deviceUuid,vmId,platformId);
    if(vmId&&platformId){
      let stragety = await getStragety(platformId);
      if(stragety){
        param = CloudPlatformHelper
                    .switchByIdentifier(stragety.identifier)
                    .buildOperateVmParam(vmId);
      }
    }
    getRemoteControl({
      targetDeviceUuid:"",
      platformId:platformId,
      vmId:vmId,
      param:param
    }).then(res=>{
      console.log(res);
      // src.value = res.URL;
      if(res.url){
        var iframe = document.createElement("iframe");
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.margin = "0";
        iframe.style.padding = "0";
        iframe.style.overflow = "hidden";
        iframe.style.border = "none";
        iframe.src = res.url;
        console.log(iframe);
        document.getElementById("iframeWin").append(iframe)
      }else{
        proxy.$alert('暂无可用VNC',"提示")
      }
      
      

    })
}

</script>