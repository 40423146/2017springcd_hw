var tipuesearch = {"pages":[{"title":"About","url":"./pages/about/","tags":"misc","text":"2017Spring 機械設計工程系協同產品設計實習 課程倉儲: http://github.com/mdecourse/2017springwcm 課程投影片: http://mdecourse.github.io/2017springwcm 課程網誌: http://mdecourse.github.io/2017springwcm/blog"},{"title":"20170511 第十二週","url":"./2017spring-cd-W12.html","tags":"Course","text":"三種正齒輪嚙合 協同產品設計實習課程 第十二週 window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } # 導入 browser 模組中的 document, 並設為 doc 變數 from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) # 準備在 id=\"gear3\" 的 canvas 中繪圖 canvas = doc[\"gear3\"] ctx = canvas.getContext(\"2d\") # 模數決定齒的尺寸大小, 囓合齒輪組必須有相同的模數與壓力角 # 壓力角 pa 單位為角度 pa = 20 # 第1齒輪齒數 n_g1 = 17 # 第2齒輪齒數 n_g2 = 11 # 第3齒輪齒數 n_g3 = 13 # m 為模數, 根據畫布的寬度, 計算適合的模數大小 m = (0.8*canvas.width)/(n_g1+n_g2+n_g3) # 根據模數 m, 計算各齒輪的節圓半徑 rp_g1 = m*n_g1/2 rp_g2 = m*n_g2/2 rp_g3 = m*n_g3/2 #單一正齒輪繪圖呼叫格式 Spur(ctx).Gear(x, y, r, n, pa, \"blue\") # 開始繪製囓合齒輪輪廓 # 繪圖第1齒輪的圓心座標, 因為希望繪圖佔去 canvas.width 的 80%, 所以兩邊各預留 10% 距離 x_g1 = canvas.width*0.1+rp_g1 # y 方向繪圖區域上方預留 canvas.height 的 20% y_g1 = canvas.height*0.2+rp_g1 # 第2齒輪的圓心座標, 假設排列成水平, 表示各齒輪圓心 y 座標相同 x_g2 = x_g1 + rp_g1 + rp_g2 y_g2 = y_g1 # 第3齒輪的圓心座標 x_g3 = x_g1 + rp_g1 + 2*rp_g2 + rp_g3 y_g3 = y_g1 # 將第1齒輪順時鐘轉 90 度, 也就是 math.pi/2 # 使用 ctx.save() 與 ctx.restore() 以確保各齒輪以相對座標進行旋轉繪圖 ctx.save() # translate to the origin of second gear ctx.translate(x_g1, y_g1) # rotate to engage ctx.rotate(math.pi/2) # put it back ctx.translate(-x_g1, -y_g1) # 繪製第一個齒輪輪廓 Spur(ctx).Gear(x_g1, y_g1, rp_g1, n_g1, pa, \"black\") ctx.restore() # 將第2齒輪逆時鐘轉 90 度之後, 再多轉一齒, 以便與第1齒輪進行囓合 ctx.save() # translate to the origin of second gear ctx.translate(x_g2, y_g2) # rotate to engage ctx.rotate(-math.pi/2-math.pi/n_g2) # put it back ctx.translate(-x_g2, -y_g2) Spur(ctx).Gear(x_g2, y_g2, rp_g2, n_g2, pa, \"blue\") ctx.restore() # ctx.save() # translate to the origin of second gear ctx.translate(x_g3, y_g3) # rotate to engage ctx.rotate(-math.pi/2-math.pi/n_g3) # put it back ctx.translate(-x_g3, -y_g3) Spur(ctx).Gear(x_g3, y_g3, rp_g3, n_g3, pa, \"black\") ctx.restore()"},{"title":"20170504 第十一週","url":"./2017spring-cd-W11.html","tags":"Course","text":"協同產品設計實習課程 第十一週"},{"title":"20170427 第十週","url":"./2017spring-cd-W10.html","tags":"Course","text":"加減乘除運算 協同產品設計實習課程 第十週 1.加法 加法 def add(a, b): return a+b 加法運算 import sys sys.path.append(\"./m1\") import add sum = add.add(a, b) print(sum) 2減法 減法 def minus(a, b): return a-b 減法運算 import sys sys.path.append(\"./m1\") import minus sum = minus.minus(a, b) print(sum) 3.乘法 乘法 def cross(a, b): return a*b 乘法運算 import sys sys.path.append(\"./m1\") import cross sum = cross.cross(a, b) print(sum) 4.除法 除法 def div(a, b): return a/b 除法運算 import sys sys.path.append(\"./m1\") import div sum = div.div(a,b) print(sum)"},{"title":"20170420 第九週","url":"./2017spring-cd-W9.html","tags":"Course","text":"期中作業 分析四連桿軌跡圖 使用 OnShape 完成四連桿行走機構 協同產品設計實習課程 第九週 分析四連桿軌跡圖 使用 OnShape 完成四連桿行走機構 分組協同零件展示 window.onload = function(){ var madeleine = new Madeleine({ target: 'target', // target div id data: './../data/w9/Fourbar1.stl', // data path path: './../data/madeleine/src/' // path to source directory from current html file }); }; select stl file: or drop stl file"},{"title":"20170413 第八週","url":"./2017spring-cd-W8.html","tags":"Course","text":"期中自評 協同產品設計實習課程 第八週 期中自評"},{"title":"20170406 第七週","url":"./2017spring-cd-W7.html","tags":"Course","text":"利用fossil對倉儲進行管理練習 利用Onshape繪製八連桿 將八連桿導入V-rep並以馬達驅動 協同產品設計實習課程 第七週 八連桿模擬 Onshape繪製八連桿 Onshape繪製八組立 導入v-rep"},{"title":"20170330 第六週","url":"./2017spring-cd-W6.html","tags":"Course","text":"Onshape繪製四連桿，並導V-rep驅動連桿 利用Onshape繪製四連桿，並導入V-rep以馬達驅動 協同產品設計實習課程 第六週 Onshape繪製四連桿 Onshape繪製四連桿 導入v-rep 在Onshape可以設定參數，標註尺寸時輸入 #參數名稱，能方便設計變更"},{"title":"20170323 第五週","url":"./2017spring-cd-W5.html","tags":"Course","text":"將單連桿導入V-rep並使其作動 協同產品設計實習課程 第五週 在 V-rep 設定單連桿運動"},{"title":"20170316 第四週","url":"./2017spring-cd-W4.html","tags":"Course","text":"Fossil新增組員以及組員權限設定 solvespace 、Onshape繪製單連桿機構並轉出stl檔案 協同產品設計實習課程 第四週 在 https://mde2a2.kmol.info 主機上建立 cdbg7 線上 Fossil SCM 倉儲, 用來管理各組協同產品設計實習過程中的純文件檔案 第七組 FOSSIL SCM Solvespace one_link繪製 導入v-rep"},{"title":"20170302 第三週","url":"./2017spring-cd-W3.html","tags":"Course","text":"翻譯影片，並打出逐字稿 協同產品設計實習課程 第三週 翻譯影片 hyperworks2 from 虎尾科大機械設計工程 on Vimeo . 內容: The 2017 HyperWorks release has a lot 在2017年HyperWorks發行很多版本 of enhancements to the modeling and assembly capabilities 對軟件的建模和組裝能力的增強 So we put in a new parts browser with a built-in part library 所以我們在一個新的零件瀏覽器與一個內置零件庫 The part library is a great tool for storing and loading work in progress 零件庫是用於存儲和加載正在進行工作的一個很好的工具 So you can store a catalog of all the common parts 因此，您可以存儲所有公共部分的目錄 that a workgroup needs to use,so they can download their models from their PLM system 工作組需要使用，因此他們可以從他們的PLM系統下載他們的模型 and store them locally in a parts library for a work in progress 並將它們本地存儲在正在進行的工作的零件庫中 And it keeps revision control on them 他保持對它們的修訂控制 so they can back up to the different versions and reload 所以他們可以備份到不同的版本並重新加載 And they can also build different configurations now of their models 他們也可以建立不同的配置到他們現在的的模型 In the configuration modeler now 現在在配置建模器 they can import parts from part library and then group 他們可以從零件庫導入零件然後分組 them into what we call part sets,which are 他們變成我們所說的部分集 convenient groupings of parts 即零件方便分組 And then they can drag those parts together into assemblies 然後他們可以將這些部分一起拖入組件 and configure them for different load 並為不同負載配置它們的 cases or different variations of their models 情況或他們的模型的不同變化 the other feature of haveing parts in the software 硬件部分的軟件中的另一個特點 is we do part instancing now,too 我們現在也做實例化 So if you load in a part that has 所以如果你加載在一個部分 multiple instances through the model,we support that 我們支持多個實例通過模型 We don't have to create multiple copies of it 我們不必創建它的多個副本 We can actually do the instancing,which is very memory efficient 我們可以做實際，這是非常有效的記憶 Also in the model building assembly 也在模型建築組裝 tool set is enhanced ID management as well 工具集也是增強的ID管理 So not only can we assign IDs based on different rules 因此，我們不僅可以根據不同的規則分配ID that you define in the software,but you can import ID systems 您可以在軟件中定義，但可以導入ID系統 form spreadsheets,XML files,databases 形式電子表格，XML文件，數據庫 and so forth,that are then used when 等等，然後在使用 it does the renumbering or the assembly of the model 它進行重新編號或模型的組裝 it has to resolve part collisions 它必須解決部分碰撞 Really important part of doing model assembly 做模型組裝重要的部分 is connecting all those parts together 將所有這些部分連接在一起 Connectors are really vital to the overall assembly process 連接器對整個裝配過程至關重要 The quality of the connector that you create really 您真正創建的連接器的質量 determines the outcome of the quality 確定質量的結果 of the overall assembled model as well 對整體組裝模型 So for us to get a good high fidelity solution 所以為我們得到一個良好的高保真度解決方案 you have to have a really good connection generation as well 你必須有一個非常好的連接生成 翻譯心得:是由40423141翻譯的，也讓我們練習英文，針對專有名詞找延伸資料"},{"title":"20170302 第二週","url":"./2017spring-cd-W2.html","tags":"Course","text":"利用solvespace四連桿組立，並導入Vrep。 協同產品設計實習課程 第二週 Solvespace組立四連桿機構"},{"title":"20170223 第一週","url":"./2017spring-cd-W1.html","tags":"Course","text":"利用 Solvespace 與 Onshape 組立單軸旋轉連桿系統、四連桿系統與多連桿系統。 利用python程式碼控制Vrep裡的單連桿作動。 協同產品設計實習課程 第一週 利用 Solvespace 與 Onshape 組立單軸旋轉連桿系統、四連桿系統與多連桿系統 ipv4和ipv6設定 分組方式,如何更有效的決定 小組組織跟分工的重要性 要主動教導不會的同學 ipconfig設定 下載fourbar_eightbar_solvespace_vrep.7z以及onelink_vrep_remoteapi_pos_vel.7z兩個檔案。 分別是單連桿、四連桿及八連桿，在solvespace及Vrep裡開啟。 在Vrep裡開啟one_link_robot_remoteAPI.ttt。(Vrep副檔名為ttt) 在SciTE裡開啟one_link_robot_remoteAPI_joint_target_vel.py。 按下Tool裡的Go即可開始控制單連桿，按Enter會旋轉，按P會暫停。 Onshape零件繪製 Onshape零件組裝"}]};