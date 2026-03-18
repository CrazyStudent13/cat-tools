/*
 * @Author: crazystudent13 1076535690@qq.com
 * @Date: 2022-12-06 16:46:23
 * @LastEditors: crazystudent13 1076535690@qq.com
 * @LastEditTime: 2022-12-06 17:10:43
 * @Description: 主要整合生活中常用账号相关的判断
 */


/**
 * @description 验证邮箱格式
 * @author crazystudent13
 * @param {string} email - 需要验证的邮箱地址
 * @return {boolean} 如果格式正确返回 true，否则返回 false
 */
 export function validEmail(email) {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(email)
  }
