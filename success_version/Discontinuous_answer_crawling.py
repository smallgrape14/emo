#爬取知乎下多篇文章，只要修改多篇文章的对应的url列表即可，即爬取不连续url的笨方法方法
#！！！注意在当前目录创建XLS，保存数据
#-*- coding: UTF-8 -*-
from bs4 import BeautifulSoup  # 网页解析，获取数据
import re  # 正则表达式，进行文字匹配
import urllib.request, urllib.error  # 制定URL，获取网页数据
import xlwt  # 进行excel操作
import xlwt, xlrd
from xlutils.copy import copy
import random
import requests
import sys
from bs4 import BeautifulSoup
#------------------------------------------------爬取多篇文章，只要修改多篇文章的url即可
table=["悲伤","委屈","焦虑","崩溃"]
num=4

url = ["https://zhuanlan.zhihu.com/p/119301548"]
#     "https://zhuanlan.zhihu.com/p/371192948","https://www.zhihu.com/question/423693212/answer/1838574013",
#        "https://zhuanlan.zhihu.com/p/407023513","https://zhuanlan.zhihu.com/p/368392780","https://zhuanlan.zhihu.com/p/431972180",
#
#
#
# ]
#-------------------------------------------------
def askURL(url):
    head = {  # 模拟浏览器头部信息，这段我抄的https://blog.csdn.net/bookssea/article/details/107309591
        "User-Agent": "Mozilla / 5.0(Windows NT 10.0; Win64; x64) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 80.0.3987.122  Safari / 537.36"
    }
    request = urllib.request.Request(url, headers=head)
    html = ""
    try:
        response = urllib.request.urlopen(request)
        html = response.read().decode("utf-8")
    except urllib.error.URLError as e:
        if hasattr(e, "code"):
            print(e.code)
        if hasattr(e, "reason"):
            print(e.reason)
    print("URL内容请求成功")
    return html

# 如果正则表达式返回为空列表，则返回""，否则返回第0个元素
def getContent(content):
    if content == []:
        return ""
    else:
        return content[0]

# 将正则表达式编译成 Pattern 对象

findzu = re.compile(r'<div class="RichContent-inner">(.*?)</div>')
pattern_page = re.compile(r'<div class="f18 mb20">(.*?)</div>', re.S)

# 爬取网页
def getData(url):
    datalist = []  # 用来存储爬取的网页信息
    html = askURL(url)  # 保存获取到的网页源码
    soup = BeautifulSoup(html, "html.parser")
    soup.prettify()
    body = soup.body
    print(body.text)
    answer=body.text
    # answer = body.find('span', {'class': 'RichText ztext CopyrightRichText-richText'})
    # print(str(answer))
    group=re.findall(r"[\w']+", str(answer))
    # group=answer.strip('')
    print(group)
    for i in group:
        datalist.append(i)
    # if answer.string is not  None:
    #     out = '';
    # for datastring in answer:
    #     datastring = datastring.encode('utf-8')
    #     print('data',datastring)
            # out = out + '\n' + str(datastring, encoding='utf-8')
    # else:
    #     print(answer.string.encode('utf-8'))
    return datalist





    group=soup.body.find('div', {'class':"css-1yuhvjn"})
    # data=group.strip('。')
    # print(data)
    # print(soup.body{'class':"WhiteBg-body"})
    # group=soup.find_all('div',_class='css-1yuhvjn')
    # Post - RichTextContainer
    #css-1yuhvjn

    # print(group)
    # findp = re.compile(r'<p(.*?)>(.*?)</p>')  # 文字
    # group = re.findall(findp, str(group));
    # print(group)
    # for i in group:
    #     #item = re.findall(findp, str(i));
    #     # for j in item:
    #     #     if '\u4e00' <= j <= '\u9fff':
    #     oneinfo = [str(id), i, '悲伤']
    #     datalist.append(oneinfo);
    #     id = id + 1
    #     print(oneinfo);
    # return datalist


# 保存数据到表格
def saveData(datalist, filename):
    print("save excel.......")
    global  num
    data = xlrd.open_workbook(filename, formatting_info=True)
    excel = copy(wb=data)  # 完成xlrd对象向xlwt对象转换
    excel_table = excel.get_sheet(0)  # 获得要操作的页
    table = data.sheets()[0]
    nrows = table.nrows  # 获得行数
    # ncols = table.ncols  # 获得列数
    for value in datalist:
        x=random.randint(0,num-1)
        list=[str(1),value,table[x]]
        # print(nrows)
        for i in range(3):
            print(excel_table.write(nrows, i, list[i]) ) # 因为单元格从0开始算，所以row不需要加一

        nrows = nrows + 1
    excel.save(filename)


# 保存数据到txt
def saveTxt(datalist, savepath):
    print("save txt.......")
    txtfile = open(savepath, 'w', encoding='utf-8')

    for i in range(0, len(datalist)):
        txtfile.write(str(datalist[i]) + "\n");
    txtfile.close()


# main函数
if __name__ == "__main__":
    # 1.爬取网页+解析数据
    for i in url:

        datalist = getData(i)

        print("爬取完毕！")

        # 2.当前目录创建XLS，保存数据
        saveData(datalist,"new_emo.xls")

    # 3.当前目录创建TXT，保存数据
    # saveTxt(datalist, tablename + ".txt")

        print("输出完毕！")
