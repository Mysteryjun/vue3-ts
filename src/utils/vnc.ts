const IMAGE_FORMAT = {
  QCOW2: 'qcow2',
  ISO: 'iso'
};

class CloudPlatform {

  /**
   * 格式化EndPoint
   * @param endpoint
   * @returns {{}}
   */
  formatEndPoint(endpoint: any) {
    endpoint = JSON.parse(endpoint);
    return {
      keystone: endpoint['IDENTITY'],
      MANAGEMENT: endpoint['MANAGEMENT']
    };
  }

  /**
   * 从平台窗口获取平台id
   * @returns {string} 平台id
   */
  getPidFromWindow() {
    return '';
  }

  /**
   * 获取平台支持的镜像格式
   * @returns {Array<String>} 支持的镜像格式数组
   */
  getSupportedImageFormat() {
    return [];
  }

  /**
   * 镜像上传状态变更处理器
   * @param state 上传状态
   */
  handleUploadStateChange(state: any) {
    // Ext.getCmp("preButton")?.setDisabled(state === 'uploading');
  }

  /**
   * 获取空闲空间
   * @param pid 云平台id
   * @return {BigInteger|null}
   */
  getFreeSpaceFromCloud(pid: any) {
    return null;
  }

  /**
   * 构建镜像上传参数
   * @param path 分片路径/聚合路径
   * @param fileName 文件名
   * @return {{}} 参数对象
   */
  buildUploadImageParam(path: any, fileName: any) {
    return {};
  }

  /**
   * 构建远程控制请求参数
   * @param vmId
   * @return {*}
   */
  buildRemoteControlParam(vmId: any) {
    return null
  }

  /**
   * 构建操作云主机请求参数
   * 操作包括：启动、停止、删除、获取网络信息、获取安全组信息
   * @param vmId
   * @return {*}
   */
  buildOperateVmParam(vmId: any) {
    return null;
  }

  /**
   * 构建删除云主机网络请求参数
   * @param vmNetwork
   * @param vm
   * @return {String}
   */
  buildRemoveVmNetworkParam(vmNetwork: any, vm: any) {
    return null;
  }

  /**
   * 构建删除云主机网络请求参数(目标主机页面)
   * @param netWork
   * @return {*}
   */
  buildRemoveVmNetworkParamOfTargetHost(netWork: any) {
    return null;
  }

  /**
   * 是否支持公网
   * @returns {boolean}
   */
  isSupportedPublicNet() {
    return true;
  }

  /**
   * 是否支持安全组
   * @returns {boolean}
   */
  isSupportedSecurityGroup() {
    return true;
  }

  /**
   * 构建操作安全组请求参数
   * 操作包括：添加安全组、删除安全组
   * @param vmId
   * @param securityGroupId
   * @returns {*}
   */
  buildOperateSecurityGroupParam(vmId: any, securityGroupId: any) {
    return null;
  }

  /**
   * 构建查询云主机可绑定的安全组请求参数
   * @param vmId
   * @returns {*}
   */
  buildFindVmBindableSecurityGroupParam(vmId: any) {
    return null;
  }

  /**
   * 是否支持一键创建
   * @returns {boolean}
   */
  isSupportedQuickCreate() {
    return true;
  }

  /**
   * 是否支持配置云主机
   * @returns {boolean}
   */
  isSupportedConfigVm() {
    return true;
  }
}

class OpenStack extends CloudPlatform {

  /**
   *
   * @param endpoint
   * @return {{NETWORK: *, IMAGE: *, COMPUTE: *, VOLUME: *, keystone: *}}
   */
  formatEndPoint(endpoint: any): any {
    endpoint = JSON.parse(endpoint);
    return {
      keystone: endpoint['IDENTITY'],
      IMAGE: endpoint['IMAGE'],
      COMPUTE: endpoint['COMPUTE'],
      NETWORK: endpoint['NETWORK'],
      VOLUME: endpoint['VOLUME']
    };
  }



  getSupportedImageFormat(): any {
    return [IMAGE_FORMAT.QCOW2];
  }



  buildRemoteControlParam(vmId: any): any {
    return JSON.stringify({
      serverId: vmId
    });
  }

  buildOperateVmParam(vmId: any): any {
    return JSON.stringify({
      serverId: vmId
    });
  }

  buildRemoveVmNetworkParam(vmNetwork: any, vm: any): any {
    return JSON.stringify({
      networkType: vmNetwork.networkType,
      vmNetworkId: vmNetwork.id
    });
  }

  buildRemoveVmNetworkParamOfTargetHost(netWork: any): any {
    return {
      "networkType": netWork.type,
      "vmNetworkId": netWork.vmNetworkId
    };
  }

  buildOperateSecurityGroupParam(vmId: any, securityGroupId: any): any {
    return {
      "serverId": vmId,
      "securityGroupIds": [securityGroupId]
    };
  }

  buildFindVmBindableSecurityGroupParam(vmId: any): any {
    return {
      "serverId": vmId
    };
  }
}

class AliCloud extends CloudPlatform {



  getSupportedImageFormat(): any {
    return [IMAGE_FORMAT.QCOW2];
  }




  buildOperateVmParam(vmId: any) {
    return vmId;
  }

  buildRemoveVmNetworkParam(vmNetwork: any, vm: any): any {
    let instanceId = vm.vmId;
    // 私网
    if (vmNetwork.networkType === 'PRIVATE') {
      return JSON.stringify({
        resourceType: 'detachENI',
        instanceId: instanceId,
        networkInterfaceId: vmNetwork.id
      });

    } else if (vmNetwork.networkType === 'PUBLIC') {
      return JSON.stringify({
        resourceType: 'detachEIP',
        instanceId: instanceId,
        allocationId: vmNetwork.id
      });
    }
    return null;
  }

  buildRemoveVmNetworkParamOfTargetHost(netWork: any): any {
    if (netWork.type === "PRIVATE") {
      return {
        "resourceType": "detachENI",
        "instanceId": netWork.vmId,
        "networkInterfaceId": netWork.vmNetworkId
      }
    } else {
      return {
        "resourceType": "detachEIP",
        "instanceId": netWork.vmId,
        "allocationId": netWork.vmNetworkId
      }
    }
  }

  isSupportedPublicNet() {
    return false;
  }

  buildOperateSecurityGroupParam(vmId: any, securityGroupId: any): any {
    return {
      "securityGroupId": securityGroupId,
      "instanceId": vmId
    };
  }

  buildFindVmBindableSecurityGroupParam(vmId: any): any {
    return {
      instanceId: vmId
    };
  }

  /**
   * 阿里云不提供一键创建云主机功能
   * @returns {boolean}
   */
  isSupportedQuickCreate() {
    return false;
  }

  /**
   * 阿里云不提供配置云主机功能
   * @returns {boolean}
   */
  isSupportedConfigVm() {
    return false;
  }
}

class ZStack extends CloudPlatform {


  getSupportedImageFormat(): any {
    return [IMAGE_FORMAT.QCOW2];
  }



  buildRemoteControlParam(vmId: any): any {
    return JSON.stringify({
      uuid: vmId
    });
  }

  buildOperateVmParam(vmId: any): any {
    return JSON.stringify({
      uuid: vmId
    });
  }

  buildRemoveVmNetworkParam(vmNetwork: any, vm: any): any {
    return JSON.stringify({
      networkType: vmNetwork.networkType,
      vmNicUuid: vmNetwork.id
    });
  }

  buildRemoveVmNetworkParamOfTargetHost(netWork: any): any {
    return {
      networkType: netWork.type,
      vmNicUuid: netWork.vmNetworkId
    };
  }

  buildOperateSecurityGroupParam(vmId: any, securityGroupId: any): any {
    return {
      "serverId": vmId,
      "securityGroupIds": [securityGroupId]
    };
  }

  buildFindVmBindableSecurityGroupParam(vmId: any): any {
    return {
      "serverId": vmId
    };
  }
}

/***
* 照着zstack改造的具体什么用法也不太清楚
*/
class Tencent extends CloudPlatform {


  getSupportedImageFormat(): any {
    return [IMAGE_FORMAT.QCOW2];
  }

  buildRemoteControlParam(vmId: any): any {
    return JSON.stringify({
      uuid: vmId
    });
  }

  buildOperateVmParam(vmId: any): any {
    return JSON.stringify({
      uuid: vmId
    });
  }

  buildRemoveVmNetworkParam(vmNetwork: any, vm: any): any {
    return JSON.stringify({
      networkType: vmNetwork.networkType,
      vmNicUuid: vmNetwork.id
    });
  }

  buildRemoveVmNetworkParamOfTargetHost(netWork: any): any {
    return {
      networkType: netWork.type,
      vmNicUuid: netWork.vmNetworkId
    };
  }

  buildOperateSecurityGroupParam(vmId: any, securityGroupId: any): any {
    return {
      "serverId": vmId,
      "securityGroupIds": [securityGroupId]
    };
  }

  buildFindVmBindableSecurityGroupParam(vmId: any): any {
    return {
      "serverId": vmId
    };
  }
}

/***
* 照着zstack改造的具体什么用法也不太清楚
*/
class Huawei extends CloudPlatform {

  getSupportedImageFormat(): any {
    return [IMAGE_FORMAT.QCOW2];
  }
  buildRemoteControlParam(vmId: any): any {
    return JSON.stringify({
      uuid: vmId
    });
  }

  buildOperateVmParam(vmId: any): any {
    return JSON.stringify({
      serverId: vmId
    });
  }

  buildRemoveVmNetworkParam(vmNetwork: any, vm: any): any {
    return JSON.stringify({
      networkType: vmNetwork.networkType,
      vmNicUuid: vmNetwork.id
    });
  }

  buildRemoveVmNetworkParamOfTargetHost(netWork: any): any {
    return {
      networkType: netWork.type,
      vmNicUuid: netWork.vmNetworkId
    };
  }

  buildOperateSecurityGroupParam(vmId: any, securityGroupId: any): any {
    return {
      "serverId": vmId,
      "securityGroupIds": [securityGroupId]
    };
  }

  buildFindVmBindableSecurityGroupParam(vmId: any): any {
    return {
      "serverId": vmId
    };
  }
}

class VSphere extends CloudPlatform {


  getSupportedImageFormat(): any {
    return [IMAGE_FORMAT.ISO];
  }





  buildOperateVmParam(vmId: any): any {
    return JSON.stringify({
      serverId: vmId
    });
  }

  buildRemoveVmNetworkParam(vmNetwork: any, vm: any): any {
    return JSON.stringify({
      serverId: vm.vmId,
      deviceKey: vmNetwork.id
    });
  }

  buildRemoveVmNetworkParamOfTargetHost(netWork: any): any {
    return {
      serverId: netWork.vmId,
      deviceKey: netWork.vmNetworkId
    };
  }

  isSupportedPublicNet() {
    return false;
  }

  isSupportedSecurityGroup() {
    return false;
  }
}

const UNKNOWN_PLATFORM = new CloudPlatform();
const PLATFORM = Object.freeze({
  'MSOpenStack': new OpenStack(),
  'MSAliCloud': new AliCloud(),
  'MSZStack': new ZStack(),
  'MSTencent': new Tencent(),
  'MSHuawei': new Huawei(),
  'MSVSphere': new VSphere()
});

class CloudPlatformHelper {
  /**
   *
   * @param identifier
   * @returns {OpenStack | AliCloud | ZStack | Tencent | Huawei | VSphere | CloudPlatform}
   */
  static switchByIdentifier(identifier: any) {
    return PLATFORM[identifier] || UNKNOWN_PLATFORM;
  }
}

export default CloudPlatformHelper