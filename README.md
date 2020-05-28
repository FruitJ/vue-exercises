# Vue exercises demo
---
![Vue](https://cn.vuejs.org/images/logo.png)
> Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。


## 一、详情 :
该仓库收录平时搜集而来的有关 Vue 练手的项目, 如果您是大神那么请绕路。如果您是萌新, 那不妨拿几个 demo 来练练手, 还记得那句古话吗 ? 
> 书读百遍，其义自见。 --- `自晋·陈寿《三国志·魏志·董遇传》`

您会收获到 :<br>
💑: **爱情**<br>
👍 : **鼓励**<br>
💡 : **知识**<br>

还等什么 ? 拿起您的键盘带上您的鼠标, 赶快搞起来吧 !!! 

## 二、状态 :
![](https://img.shields.io/badge/version-1.0.0-brightgreen)
![](https://img.shields.io/badge/downloads-0k%2Fday-%234cc61e)
![](https://img.shields.io/badge/dependencies-inaccessible-green)
![](https://img.shields.io/badge/npm-pending-blue)
![](https://img.shields.io/badge/build-passing-%23e01563)
![](https://img.shields.io/badge/Tests-passing-%23e01563)

## 三、目录 :
### 初级(语法篇) :
**`2020年 05月 28日更新`**
#### [1. vue - todo List](https://github.com/FruitJ/vue-exercises/tree/master/1.todoList)
**效果图 :**
![101.gif](https://upload-images.jianshu.io/upload_images/16761151-715ad1403cb63fa1.gif?imageMogr2/auto-orient/strip)
简单的 todo list , 这是初学时的第一个案例 ...<br>
难度: 【无】
#### [2. vue - 全选全否](https://github.com/FruitJ/vue-exercises/tree/master/2.%E5%85%A8%E9%80%89%E5%85%A8%E5%90%A6)
**效果图 :**
![101.gif](https://upload-images.jianshu.io/upload_images/16761151-1fef7552c06f545d.gif?imageMogr2/auto-orient/strip)
利用 Vue 会自动将 checkbox 的 value 值添加进 c-model 的机制, 实现一个一级的全选全否。<br>
难度: [无]
#### [3. vue - 省市县三级联动](https://github.com/FruitJ/vue-exercises/tree/master/3.%E7%9C%81%E5%B8%82%E5%8E%BF%E4%B8%89%E7%BA%A7%E8%81%94%E5%8A%A8)
**效果图 :**
![101.gif](https://upload-images.jianshu.io/upload_images/16761151-4901e444f4df5c11.gif?imageMogr2/auto-orient/strip)
中国范围的各省市的 json 数据在 `static/json/data.json` 中。这个案例主要理清省、市、县, 三者之间视图上的行为关系, 通过更新各个 select 中数据还是比较好实现的。<br>
难度: [★]
#### [4. vue - 穿梭框](https://github.com/FruitJ/vue-exercises/tree/master/4.%E7%A9%BF%E6%A2%AD%E6%A1%86)
**效果图 :**
![101.gif](https://upload-images.jianshu.io/upload_images/16761151-05f0f2c393a221ec.gif?imageMogr2/auto-orient/strip)
数据在两个面板之间自由穿梭 ...<br>
难度: [★]
#### [5. vue - 京东购物车](https://github.com/FruitJ/vue-exercises/tree/master/5.%E4%BA%AC%E4%B8%9C%E8%B4%AD%E7%89%A9%E8%BD%A6)
**效果图 :**
![101.gif](https://upload-images.jianshu.io/upload_images/16761151-c061e6fdf5332def.gif?imageMogr2/auto-orient/strip)
主要是整个结构是通过嵌套循环完成的, 并且多个店家这个层级, 所以稍稍的有些复杂, 不过理清关系就无关紧要了 ...<br>
难度: [★]
#### [6. vue - node 前后交互](https://github.com/FruitJ/vue-exercises/tree/master/6.node%20%E5%89%8D%E5%90%8E%E4%BA%A4%E4%BA%92/)
**效果 :**
![101.gif](https://upload-images.jianshu.io/upload_images/16761151-0bbc2a7abf40026e.gif?imageMogr2/auto-orient/strip)

在不使用框架的前提下打通 node 后台获取前台页面参数的各个环节, 包括普通的 GET 请求、POST 请求的四种常见内容类型的请求方式【包括文件上传】, 文件上传可以自己手动解析, 思路就是将每个数据段剥离开来, 再判断是文本域还是媒体域, 媒体域则直接写入文件, 文本域则直接转成需要的值即可, 本案例采用的是 `multiparty` 这个库来完成的上传, 虽然文件上传可以手动解析但并不推荐, 因为效率太低 ...<br>
难度: [★]

**`2020年 05月 29日预更新【今天】`**
#### 7. vue - node 小爬虫

未完待续 ...
### 中级(组件篇) :
loading ...

