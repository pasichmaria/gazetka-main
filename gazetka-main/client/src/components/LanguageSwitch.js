import React from 'react'
import { Switch } from 'antd'
import i18next from 'i18next'
import dayjs from 'dayjs'

export const LanguageSwitch = () => {
  const onChangeLanguage = (checked) => {
    if (!checked) {
      i18next.changeLanguage('en')
      dayjs.locale('en')
    } else {
      i18next.changeLanguage('ua')
      dayjs.locale('ua')
    }
  }
  return (
    <Switch
      checkedChildren="UA"
      unCheckedChildren="EN"
      defaultChecked={i18next.language === 'ua' ? true : false}
      onChange={onChangeLanguage}
    />
  )
}
