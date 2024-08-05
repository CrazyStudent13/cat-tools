/*
 * @Author: crazystudent13 1076535690@qq.com
 * @Date: 2022-12-06 16:46:23
 * @LastEditors: crazystudent13 1076535690@qq.com
 * @LastEditTime: 2022-12-06 17:10:43
 * @Description: 主要整合生活中常用账号相关的判断
 */


/**
 * 判断是否email
 * @constructor
 * @author，crazystudent13
 * @todo，暂无待办
 * @param {string} email
 * @returns {Boolean} 判断结果
 */
 export function validEmail(email) {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(email)
  }
