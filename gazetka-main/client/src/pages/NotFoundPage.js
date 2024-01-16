import { Button, Result } from 'antd'
import { t } from 'i18next'

export const NotFoundPage = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle={t("page_doesnt_exist")}
      extra={
      <Button  href="/" type="primary">{t("back_home")}
      </Button>}
    />
  )
}
