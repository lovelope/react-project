# React Project

---

## 使用方法

```bash
# 启动命令
npm start

# 切换环境
npm start --qa # qa 环境

# 构建命令
npm run build
```

## 功能

- antd 主题修改
- editorconfig 文件规范
- prettier 代码规范
- eslint
- stylelint
- babel@7
- postcss
- webpack@4
- api proxy 支持环境切换
- mobx
- sourceMap 地址替换
- git commit msg 规范
- dll 支持

## 配置切换的文件

`tools/swtich.config.js`

## 禁止用户访问 map 文件的 nginx 配置

```nginx
server {
	# 禁止访问 txt、sh、map 文件
	location ~* \.(txt|sh|map)$ {
		deny all;
	}
}
```
