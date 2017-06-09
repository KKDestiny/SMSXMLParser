
welcome to visit my website: [https://www.onelib.biz](https://www.onelib.biz)

or visit my home page: [http://www.linxiaozhou.com](http://www.linxiaozhou.com)


# SMSXMLParser
A Parse that Parse SMS XML file, and after that, display parse data on web page.

![alt](https://github.com/KKDestiny/SMSXMLParser/blob/master/public/images/demo.jpg?raw=true)


# Steps

1. Clone
2. execute `npm install`
3. run server: `node bin/www`, and open in explorer: 127.0.0.1:3000

if you want to parse your own xml file, replace the file "sms.xml". And restart the server, click "重新解析".


# XML file format

This parse can only parse a xml file as the format like this:

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<SMSRecord>
    <SMS>
        <Type>1</Type>
        <Status>0</Status>
        <IsRead>1</IsRead>
        <Address>10010100</Address>
        <Date>2012-10-24 11:53:43</Date>
        <Subject></Subject>
        <Body>【悦TV观影热点】外星生物施虐地球活抓人类，纯爷们科学家揭露恐怖真相 http://g.iuni.com.cn/classic/r.jsp?p=23285 （免信息费）</Body>
    </SMS>
    <SMS>
        <Type>1</Type>
        <Status>0</Status>
        <IsRead>1</IsRead>
        <Address>10010202</Address>
        <Date>2012-07-16 10:23:15</Date>
        <Subject></Subject>
        <Body>尊敬的用户：感谢您成功参与广东联通“G时代阶梯成长计划”活动，活动详情请登陆炫魅广东门户 http://g.iuni.com.cn/ ，查询自己的套餐和流量使用情况发送HF到10010，详情咨询10010。</Body>
    </SMS>
</SMSRecord>
```

