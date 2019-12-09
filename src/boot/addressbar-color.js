// import something here
import { AddressbarColor } from 'quasar'
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
    // something to do
    // 设置地址栏背景颜色 -- 仅限最新移动浏览器
    AddressbarColor.set('#a2e3fa')
}
