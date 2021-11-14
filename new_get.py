#爬虫方式：得到的html中进行筛选匹配。
from bs4 import BeautifulSoup           # 网页解析，获取数据
import re                               # 正则表达式，进行文字匹配
import urllib.request, urllib.error     # 制定URL，获取网页数据
import xlwt                             # 进行excel操作

tablename = 'emo推送2'
url = "https://www.zhihu.com/question/442490819"  
col = ("文字");


# 将正则表达式编译成 Pattern 对象
findtext = re.compile(r'<p>(.*?)</p>')  # 文字
findzu=re.compile(r'<div class="RichContent-inner">(.*?)</div>')
pattern_page = re.compile(r'<div class="f18 mb20">(.*?)</div>', re.S)
# 得到指定一个URL的网页内容
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


# 爬取网页
def getData(url):
    datalist = []  # 用来存储爬取的网页信息
    html = askURL(url)  # 保存获取到的网页源码
    a=re.compile(r'<div class="List-item" tabindex="0">(.*?)</div>');
    soup = BeautifulSoup(html, "html.parser")
    group=re.findall(findzu,str(soup));
    #print(group);
    for i in group:
          item=re.findall(findtext,str(i));
          for j in item:
                datalist.append(j);
                print(j);
    return datalist


# 保存数据到表格
def saveData(datalist, savepath):
    print("save excel.......")
    book = xlwt.Workbook(encoding="utf-8",style_compression=0) # 创建workbook对象
    sheet = book.add_sheet(tablename, cell_overwrite_ok=True) # 创建工作表
    
    #for i in range(0, len(col)):
    sheet.write(0,0,col[0])  # 列名
    for i in range(0, len(datalist)):
        sheet.write(i+1,0,datalist[i])  # 数据
    book.save(savepath) # 保存
# 保存数据到txt
def saveTxt(datalist, savepath):
    print("save txt.......")
    txtfile = open(savepath, 'w', encoding='utf-8')
    
    for i in range(0, len(datalist)):
        txtfile.write(str(datalist[i])+"\n");
    txtfile.close()


# main函数
if __name__ == "__main__":
    
    # 1.爬取网页+解析数据
    datalist = getData(url)

    print("爬取完毕！")
    
    # 2.当前目录创建XLS，保存数据
    saveData(datalist, tablename+".xls")
    
    # 3.当前目录创建TXT，保存数据
    saveTxt(datalist, tablename+".txt")

    print("输出完毕！")
