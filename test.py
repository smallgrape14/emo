from bs4 import BeautifulSoup           # 网页解析，获取数据
import re                               # 正则表达式，进行文字匹配
import urllib.request, urllib.error     # 制定URL，获取网页数据
import xlwt                             # 进行excel操作

gamename = '战女神M'
subjectname = '88429'  # 就是你要爬的内容的subject号
baseurl = "http://bgm.tv"  # bangumi链接
url = baseurl + "/subject/"+ subjectname +"/characters"  # 要爬取的网页链接
col = ("角色详情链接", "角色日文名", "角色中文名", "CV详情链接", "CV中译名")


# 创建正则表达式对象
findChara = re.compile(r'<h2>(.*?)</h2>')  # 角色信息
findCharaLink = re.compile(r'<a class="l" href="(.*?)">')  # 0.角色详情链接
findCharaJapanese = re.compile(r'">(.*?)</a>')  # 1.角色日文名
findCharaChinese = re.compile(r'<span class="tip"> / (.*?)</span>')  # 2.角色中文名
findCvLink = re.compile(r'<a class="avatar" href="(.*?)">')  # 3.CV详情链接
findCvName = re.compile(r'<small class="grey">(.*?)</small>')  # 4.CV名字
