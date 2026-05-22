(function () {
  const qualityLabels = {
    white: "白",
    blue: "蓝",
    purple: "紫",
    gold: "金",
  };

  const qualityClass = {
    white: "quality-white",
    blue: "quality-blue",
    purple: "quality-purple",
    gold: "quality-gold",
  };

  const codexQualityOrder = {
    white: 1,
    blue: 2,
    purple: 3,
    gold: 4,
  };

  const categoryLabels = {
    Furniture: "家具",
    Jewelry: "珠宝",
    Electronics: "电器",
    Art: "艺术品",
    Tools: "工具设备",
    Collectible: "收藏品",
    Container: "容器",
    Junk: "杂物",
  };

  const toolLabels = {
    flashlight: "手电筒",
    wideLamp: "广角灯",
    magnifier: "放大镜",
  };

  const traitLabels = {
    "faded fabric": "褪色布料",
    "rounded cushion edge": "圆润坐垫边缘",
    "wooden short legs": "短木脚",
    "warm oak grain": "温润橡木纹",
    "thick rectangular top": "厚实长方桌面",
    "heavy legs": "粗重桌腿",
    "carved chair back": "雕花椅背",
    "dark varnish": "深色清漆",
    "curved arms": "弧形扶手",
    "deep red wood": "深红木色",
    "brass hinge plate": "黄铜合页片",
    "dense grain": "致密木纹",
    "thin pole": "细灯杆",
    "cream plastic shade": "米色塑料灯罩",
    "cheap base": "廉价底座",
    "blue floral marks": "蓝色花纹",
    "glazed porcelain body": "釉面瓷身",
    "brass neck": "黄铜颈部",
    "small silver loop": "小银环",
    "plain shine": "素面光泽",
    "thin band": "细戒圈",
    "deep blue oval stone": "深蓝椭圆宝石",
    "silver prongs": "银色爪镶",
    "tiny glints": "细小闪光",
    "fake red badge": "仿红色标识",
    "round gold case": "圆形金色表壳",
    "small crown": "小表冠",
    "chain loop": "链环",
    "green-gold oval": "金绿色椭圆石面",
    "single bright eye line": "单条明亮猫眼线",
    "small velvet case": "小天鹅绒盒",
    "brown corrugation": "棕色瓦楞纹",
    "shipping tape": "封箱胶带",
    "crushed corners": "压皱箱角",
    "red metal lid": "红色金属盖",
    "silver latch": "银色锁扣",
    "handle ridge": "提手凸起",
    "tiny brass tools": "细小黄铜工具",
    "velvet tray": "天鹅绒托盘",
    "precision tweezers": "精密镊子",
    "round dial": "圆形转盘",
    "thick grey door": "厚重灰色柜门",
    "heavy hinge": "厚重铰链",
    "wax seal": "蜡封",
    "brass plate": "黄铜铭牌",
    "old inventory tag": "旧库存标签",
    "bulky glass screen": "笨重玻璃屏",
    "plastic knob": "塑料旋钮",
    "dusty casing": "积灰外壳",
    "wood grille": "木质格栅",
    "round tuning dial": "圆形调频盘",
    "warm amber face": "暖琥珀色面板",
    "black leatherette": "黑色仿皮纹",
    "silver lens ring": "银色镜头环",
    "top dial": "顶部拨盘",
    "red dot": "红色圆点",
    "silver rangefinder top": "银色旁轴机顶",
    "black leather body": "黑色皮革机身",
    "black circular platter": "黑色圆形唱盘",
    "thin tonearm": "细唱臂",
    "wood base": "木质底座",
    "album spines": "唱片侧标",
    "colored labels": "彩色标签",
    "crate slats": "木箱条板",
    "thin frame": "细边框",
    "bright printed sky": "明亮印刷天空",
    "flat surface": "平整表面",
    "thick brush strokes": "厚重笔触",
    "linen texture": "亚麻画布纹理",
    "aged frame": "做旧画框",
    "artist signature": "画家签名",
    "red seal mark": "红色印章",
    "rice paper fibers": "宣纸纤维",
    "dark ink strokes": "深色墨迹",
    "blue floral glaze": "蓝色花卉釉纹",
    "narrow neck": "细窄瓶颈",
    "white porcelain curve": "白瓷弧面",
    "hairline crack": "细微冲线",
    "imperial foot ring": "规整圈足",
    "too-bright glaze": "过亮釉面",
    "printed floral marks": "印刷花纹",
    "smooth base": "过于光滑的底足",
    "green patina": "绿色铜锈",
    "heavy base": "厚重底座",
    "sculpted silhouette": "雕塑轮廓",
    "milky green translucence": "乳绿色半透明感",
    "carved robe edge": "衣纹雕刻边",
    "soft glow": "柔和光泽",
    "black enamel body": "黑色珐琅机身",
    "gold floral decals": "金色花纹贴饰",
    "iron treadle": "铁制踏板",
    "vertical column": "竖直立柱",
    "round drill head": "圆形钻头座",
    "steel base": "钢制底座",
    "long wood case": "长木壳",
    "round clock face": "圆形钟面",
    "brass pendulum": "黄铜摆锤",
    "colorful comic spines": "彩色漫画书脊",
    "plastic sleeves": "塑封保护套",
    "white storage box": "白色收藏盒",
    "clear slab": "透明评级壳",
    "graded label": "评级标签",
    "tiny portrait frame": "小人物图框",
    "branded crate stamp": "品牌木箱印戳",
    "bottle neck circles": "酒瓶颈圆痕",
    "dark straw packing": "深色稻草填充",
    "silver reflection": "银色反光",
    "cracked line": "裂纹线",
    "ornate gold frame": "华丽金色框",
    "aged glass": "老化镜面",
    "carved crest": "雕花顶饰",
    "bright new glass": "过新的镜面",
    "mold seam": "模具接缝",
    "black grille": "黑色网罩",
    "plastic corner": "塑料边角",
    "red sticker": "红色贴纸",
    "twin speaker cones": "双扬声器单元",
    "matte cabinet": "哑光箱体",
    "brand badge": "品牌铭牌",
    "long black case": "黑色长盒",
    "curved waist": "弧形腰线",
    "metal clasp": "金属搭扣",
    "amber varnish": "琥珀色清漆",
    "f-hole curve": "F 孔弧线",
    "old maker label": "旧制作者标签",
    "plain maker label": "普通制作者标签",
    "rolled fabric edge": "卷起的布边",
    "muted pattern": "暗淡花纹",
    "frayed binding": "磨损包边",
    "dense red pattern": "密集红色纹样",
    "fine fringe": "细密流苏",
    "navy border": "深蓝边框",
    "printed fringe": "印刷流苏",
    "uniform border": "过于均匀的边框",
    "thin grey door": "薄灰色柜门",
    "fresh pry marks": "新撬痕",
    "wood veneer": "木皮箱体",
    "brass brand badge": "黄铜品牌铭牌",
    "pressed back plate": "压印背板",
  };

  function money(value) {
    return `$${Math.round(value).toLocaleString("en-US")}`;
  }

  function svgEl(tag, attrs = {}, children = []) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const [key, value] of Object.entries(attrs)) {
      element.setAttribute(key, String(value));
    }
    for (const child of children) element.appendChild(child);
    return element;
  }

  function addSvgShape(group, shape, x, y, w, h, colors) {
    const [primary, secondary] = colors;
    const stroke = "#1f2937";

    const rect = (attrs) => group.appendChild(svgEl("rect", { rx: 8, stroke, "stroke-width": 2, ...attrs }));
    const circle = (attrs) => group.appendChild(svgEl("circle", { stroke, "stroke-width": 2, ...attrs }));
    const ellipse = (attrs) => group.appendChild(svgEl("ellipse", { stroke, "stroke-width": 2, ...attrs }));
    const line = (attrs) => group.appendChild(svgEl("line", { stroke, "stroke-width": 3, "stroke-linecap": "round", ...attrs }));
    const path = (attrs) => group.appendChild(svgEl("path", { stroke, "stroke-width": 2, "stroke-linejoin": "round", ...attrs }));

    rect({ x, y, width: w, height: h, fill: primary, opacity: 0.96 });

    switch (shape) {
      case "sofa":
        rect({ x: x + w * 0.08, y: y + h * 0.18, width: w * 0.84, height: h * 0.45, fill: primary });
        rect({ x: x + w * 0.06, y: y + h * 0.56, width: w * 0.88, height: h * 0.26, fill: secondary });
        line({ x1: x + w * 0.33, y1: y + h * 0.2, x2: x + w * 0.33, y2: y + h * 0.78, stroke: "#e9dfd2" });
        line({ x1: x + w * 0.66, y1: y + h * 0.2, x2: x + w * 0.66, y2: y + h * 0.78, stroke: "#e9dfd2" });
        break;
      case "table":
        rect({ x: x + w * 0.08, y: y + h * 0.16, width: w * 0.84, height: h * 0.28, fill: primary });
        line({ x1: x + w * 0.2, y1: y + h * 0.45, x2: x + w * 0.16, y2: y + h * 0.86, stroke: secondary });
        line({ x1: x + w * 0.8, y1: y + h * 0.45, x2: x + w * 0.84, y2: y + h * 0.86, stroke: secondary });
        break;
      case "cabinet":
        line({ x1: x + w * 0.5, y1: y + 6, x2: x + w * 0.5, y2: y + h - 6, stroke: secondary });
        circle({ cx: x + w * 0.45, cy: y + h * 0.52, r: 5, fill: secondary });
        circle({ cx: x + w * 0.55, cy: y + h * 0.52, r: 5, fill: secondary });
        for (let i = 0; i < 5; i += 1) {
          line({ x1: x + 12, y1: y + 18 + i * 18, x2: x + w - 12, y2: y + 26 + i * 18, stroke: "#9f3b2e", "stroke-width": 2 });
        }
        break;
      case "chairs":
        rect({ x: x + w * 0.08, y: y + h * 0.18, width: w * 0.34, height: h * 0.62, fill: primary });
        rect({ x: x + w * 0.58, y: y + h * 0.18, width: w * 0.34, height: h * 0.62, fill: primary });
        line({ x1: x + w * 0.15, y1: y + h * 0.28, x2: x + w * 0.35, y2: y + h * 0.28, stroke: secondary });
        line({ x1: x + w * 0.65, y1: y + h * 0.28, x2: x + w * 0.85, y2: y + h * 0.28, stroke: secondary });
        break;
      case "lamp":
        line({ x1: x + w * 0.5, y1: y + h * 0.26, x2: x + w * 0.5, y2: y + h * 0.78, stroke: secondary });
        path({ d: `M ${x + w * 0.26} ${y + h * 0.16} L ${x + w * 0.74} ${y + h * 0.16} L ${x + w * 0.64} ${y + h * 0.34} L ${x + w * 0.36} ${y + h * 0.34} Z`, fill: primary });
        ellipse({ cx: x + w * 0.5, cy: y + h * 0.84, rx: w * 0.28, ry: h * 0.08, fill: secondary });
        break;
      case "ring":
      case "gemRing":
        circle({ cx: x + w * 0.5, cy: y + h * 0.58, r: Math.min(w, h) * 0.28, fill: "none", stroke: secondary, "stroke-width": 7 });
        if (shape === "gemRing") ellipse({ cx: x + w * 0.5, cy: y + h * 0.3, rx: w * 0.2, ry: h * 0.14, fill: primary });
        break;
      case "gem":
      case "jade":
      case "jadeFake":
        ellipse({ cx: x + w * 0.5, cy: y + h * 0.5, rx: w * 0.3, ry: h * 0.38, fill: primary });
        line({ x1: x + w * 0.28, y1: y + h * 0.5, x2: x + w * 0.72, y2: y + h * 0.5, stroke: secondary });
        if (shape === "jadeFake") line({ x1: x + w * 0.34, y1: y + h * 0.28, x2: x + w * 0.66, y2: y + h * 0.72, stroke: "#64748b", "stroke-width": 2 });
        break;
      case "camera":
      case "cameraFake":
        rect({ x: x + w * 0.16, y: y + h * 0.32, width: w * 0.68, height: h * 0.42, fill: primary });
        circle({ cx: x + w * 0.52, cy: y + h * 0.52, r: Math.min(w, h) * 0.18, fill: secondary });
        rect({ x: x + w * 0.18, y: y + h * 0.2, width: w * 0.24, height: h * 0.15, fill: secondary });
        if (shape === "cameraFake") circle({ cx: x + w * 0.76, cy: y + h * 0.36, r: Math.min(w, h) * 0.05, fill: "#ef4444", stroke: "#7f1d1d" });
        break;
      case "safe":
      case "sealedSafe":
      case "safeEmpty":
        rect({ x: x + w * 0.12, y: y + h * 0.12, width: w * 0.76, height: h * 0.76, fill: primary });
        circle({ cx: x + w * 0.48, cy: y + h * 0.46, r: Math.min(w, h) * 0.13, fill: secondary });
        line({ x1: x + w * 0.64, y1: y + h * 0.54, x2: x + w * 0.8, y2: y + h * 0.54, stroke: secondary });
        if (shape === "sealedSafe") rect({ x: x + w * 0.18, y: y + h * 0.68, width: w * 0.22, height: h * 0.12, fill: "#7f1d1d" });
        if (shape === "safeEmpty") line({ x1: x + w * 0.2, y1: y + h * 0.68, x2: x + w * 0.4, y2: y + h * 0.76, stroke: "#111827" });
        break;
      case "painting":
      case "paintingMaster":
      case "mirror":
      case "mirrorRepro":
        rect({ x: x + w * 0.12, y: y + h * 0.1, width: w * 0.76, height: h * 0.8, fill: secondary });
        rect({ x: x + w * 0.2, y: y + h * 0.18, width: w * 0.6, height: h * 0.64, fill: primary, opacity: 0.88 });
        if (shape === "paintingMaster") line({ x1: x + w * 0.54, y1: y + h * 0.72, x2: x + w * 0.74, y2: y + h * 0.76, stroke: "#111827", "stroke-width": 2 });
        if (shape === "mirror" || shape === "mirrorRepro") line({ x1: x + w * 0.24, y1: y + h * 0.25, x2: x + w * 0.72, y2: y + h * 0.68, stroke: "#eff6ff" });
        if (shape === "mirrorRepro") line({ x1: x + w * 0.22, y1: y + h * 0.78, x2: x + w * 0.78, y2: y + h * 0.78, stroke: "#94a3b8", "stroke-width": 2 });
        break;
      case "vase":
      case "mingVaseFake":
      case "mingVaseCracked":
      case "mingVasePerfect":
      case "porcelainLamp":
        path({ d: `M ${x + w * 0.48} ${y + h * 0.1} C ${x + w * 0.28} ${y + h * 0.3}, ${x + w * 0.26} ${y + h * 0.72}, ${x + w * 0.5} ${y + h * 0.9} C ${x + w * 0.74} ${y + h * 0.72}, ${x + w * 0.72} ${y + h * 0.3}, ${x + w * 0.52} ${y + h * 0.1} Z`, fill: primary });
        line({ x1: x + w * 0.36, y1: y + h * 0.46, x2: x + w * 0.64, y2: y + h * 0.38, stroke: secondary });
        line({ x1: x + w * 0.34, y1: y + h * 0.58, x2: x + w * 0.66, y2: y + h * 0.62, stroke: secondary, "stroke-width": 2 });
        if (shape === "mingVaseFake") {
          line({ x1: x + w * 0.32, y1: y + h * 0.74, x2: x + w * 0.68, y2: y + h * 0.74, stroke: "#93c5fd", "stroke-width": 4 });
        }
        if (shape === "mingVaseCracked") {
          path({ d: `M ${x + w * 0.58} ${y + h * 0.26} L ${x + w * 0.52} ${y + h * 0.42} L ${x + w * 0.6} ${y + h * 0.52}`, fill: "none", stroke: "#1f2937", "stroke-width": 2 });
        }
        if (shape === "mingVasePerfect") {
          line({ x1: x + w * 0.34, y1: y + h * 0.84, x2: x + w * 0.66, y2: y + h * 0.84, stroke: "#d6a93e", "stroke-width": 4 });
          circle({ cx: x + w * 0.5, cy: y + h * 0.26, r: Math.min(w, h) * 0.07, fill: "#1d4ed8" });
        }
        break;
      case "scroll":
        rect({ x: x + w * 0.24, y: y + h * 0.06, width: w * 0.52, height: h * 0.88, fill: primary });
        circle({ cx: x + w * 0.5, cy: y + h * 0.2, r: 6, fill: secondary });
        line({ x1: x + w * 0.38, y1: y + h * 0.34, x2: x + w * 0.62, y2: y + h * 0.58, stroke: "#111827" });
        break;
      case "boxes":
        rect({ x: x + w * 0.08, y: y + h * 0.12, width: w * 0.4, height: h * 0.36, fill: primary });
        rect({ x: x + w * 0.48, y: y + h * 0.16, width: w * 0.42, height: h * 0.34, fill: primary });
        rect({ x: x + w * 0.22, y: y + h * 0.48, width: w * 0.48, height: h * 0.38, fill: primary });
        line({ x1: x + w * 0.28, y1: y + h * 0.12, x2: x + w * 0.28, y2: y + h * 0.86, stroke: secondary });
        break;
      case "toolbox":
      case "toolTray":
        rect({ x: x + w * 0.12, y: y + h * 0.28, width: w * 0.76, height: h * 0.48, fill: primary });
        rect({ x: x + w * 0.34, y: y + h * 0.16, width: w * 0.32, height: h * 0.14, fill: secondary });
        line({ x1: x + w * 0.18, y1: y + h * 0.48, x2: x + w * 0.82, y2: y + h * 0.48, stroke: secondary });
        if (shape === "toolTray") {
          line({ x1: x + w * 0.28, y1: y + h * 0.62, x2: x + w * 0.46, y2: y + h * 0.36, stroke: "#f8fafc", "stroke-width": 2 });
          line({ x1: x + w * 0.54, y1: y + h * 0.36, x2: x + w * 0.74, y2: y + h * 0.62, stroke: "#f8fafc", "stroke-width": 2 });
        }
        break;
      case "tv":
        rect({ x: x + w * 0.12, y: y + h * 0.18, width: w * 0.76, height: h * 0.56, fill: primary });
        rect({ x: x + w * 0.2, y: y + h * 0.26, width: w * 0.48, height: h * 0.36, fill: secondary });
        circle({ cx: x + w * 0.78, cy: y + h * 0.34, r: 4, fill: "#111827" });
        circle({ cx: x + w * 0.78, cy: y + h * 0.52, r: 4, fill: "#111827" });
        break;
      case "radio":
        rect({ x: x + w * 0.1, y: y + h * 0.22, width: w * 0.8, height: h * 0.54, fill: primary });
        for (let i = 0; i < 4; i += 1) line({ x1: x + w * 0.2 + i * w * 0.08, y1: y + h * 0.3, x2: x + w * 0.2 + i * w * 0.08, y2: y + h * 0.66, stroke: secondary, "stroke-width": 2 });
        circle({ cx: x + w * 0.72, cy: y + h * 0.5, r: Math.min(w, h) * 0.12, fill: secondary });
        break;
      case "turntable":
        rect({ x: x + w * 0.1, y: y + h * 0.18, width: w * 0.8, height: h * 0.64, fill: primary });
        circle({ cx: x + w * 0.42, cy: y + h * 0.5, r: Math.min(w, h) * 0.22, fill: secondary });
        line({ x1: x + w * 0.62, y1: y + h * 0.34, x2: x + w * 0.78, y2: y + h * 0.62, stroke: "#e5e7eb", "stroke-width": 2 });
        break;
      case "vinylCrate":
        rect({ x: x + w * 0.12, y: y + h * 0.22, width: w * 0.76, height: h * 0.56, fill: primary });
        for (let i = 0; i < 5; i += 1) line({ x1: x + w * 0.22 + i * w * 0.11, y1: y + h * 0.28, x2: x + w * 0.22 + i * w * 0.11, y2: y + h * 0.72, stroke: secondary, "stroke-width": 2 });
        break;
      case "statue":
        ellipse({ cx: x + w * 0.5, cy: y + h * 0.82, rx: w * 0.32, ry: h * 0.08, fill: secondary });
        path({ d: `M ${x + w * 0.5} ${y + h * 0.14} C ${x + w * 0.28} ${y + h * 0.34}, ${x + w * 0.36} ${y + h * 0.68}, ${x + w * 0.5} ${y + h * 0.76} C ${x + w * 0.66} ${y + h * 0.66}, ${x + w * 0.74} ${y + h * 0.34}, ${x + w * 0.5} ${y + h * 0.14} Z`, fill: primary });
        break;
      case "sewing":
        rect({ x: x + w * 0.18, y: y + h * 0.56, width: w * 0.64, height: h * 0.18, fill: secondary });
        path({ d: `M ${x + w * 0.2} ${y + h * 0.48} C ${x + w * 0.34} ${y + h * 0.18}, ${x + w * 0.78} ${y + h * 0.24}, ${x + w * 0.82} ${y + h * 0.48} Z`, fill: primary });
        line({ x1: x + w * 0.36, y1: y + h * 0.74, x2: x + w * 0.24, y2: y + h * 0.92, stroke: secondary });
        line({ x1: x + w * 0.64, y1: y + h * 0.74, x2: x + w * 0.76, y2: y + h * 0.92, stroke: secondary });
        break;
      case "machine":
        rect({ x: x + w * 0.18, y: y + h * 0.78, width: w * 0.64, height: h * 0.12, fill: secondary });
        line({ x1: x + w * 0.5, y1: y + h * 0.18, x2: x + w * 0.5, y2: y + h * 0.78, stroke: primary, "stroke-width": 8 });
        rect({ x: x + w * 0.32, y: y + h * 0.2, width: w * 0.36, height: h * 0.18, fill: primary });
        line({ x1: x + w * 0.5, y1: y + h * 0.38, x2: x + w * 0.5, y2: y + h * 0.58, stroke: "#111827", "stroke-width": 2 });
        break;
      case "clock":
        rect({ x: x + w * 0.2, y: y + h * 0.06, width: w * 0.6, height: h * 0.88, fill: primary });
        circle({ cx: x + w * 0.5, cy: y + h * 0.22, r: w * 0.18, fill: "#f8fafc" });
        line({ x1: x + w * 0.5, y1: y + h * 0.42, x2: x + w * 0.5, y2: y + h * 0.76, stroke: secondary });
        break;
      case "comicBox":
        rect({ x: x + w * 0.12, y: y + h * 0.2, width: w * 0.76, height: h * 0.58, fill: primary });
        for (let i = 0; i < 4; i += 1) rect({ x: x + w * (0.22 + i * 0.12), y: y + h * 0.26, width: w * 0.07, height: h * 0.46, fill: i % 2 ? secondary : "#2563eb" });
        break;
      case "card":
        rect({ x: x + w * 0.24, y: y + h * 0.12, width: w * 0.52, height: h * 0.76, fill: primary });
        rect({ x: x + w * 0.3, y: y + h * 0.2, width: w * 0.4, height: h * 0.16, fill: secondary });
        circle({ cx: x + w * 0.5, cy: y + h * 0.58, r: Math.min(w, h) * 0.12, fill: secondary });
        break;
      case "wineCrate":
        rect({ x: x + w * 0.1, y: y + h * 0.18, width: w * 0.8, height: h * 0.64, fill: primary });
        for (let i = 0; i < 3; i += 1) circle({ cx: x + w * (0.32 + i * 0.18), cy: y + h * 0.46, r: Math.min(w, h) * 0.08, fill: secondary });
        line({ x1: x + w * 0.18, y1: y + h * 0.68, x2: x + w * 0.82, y2: y + h * 0.68, stroke: "#f2d1a0", "stroke-width": 2 });
        break;
      case "speaker":
      case "speakers":
      case "speakersVintage":
        rect({ x: x + w * 0.14, y: y + h * 0.12, width: w * 0.72, height: h * 0.76, fill: primary });
        circle({ cx: x + w * 0.5, cy: y + h * 0.38, r: Math.min(w, h) * 0.15, fill: secondary });
        circle({ cx: x + w * 0.5, cy: y + h * 0.66, r: Math.min(w, h) * 0.18, fill: secondary });
        if (shape === "speakers" || shape === "speakersVintage") line({ x1: x + w * 0.22, y1: y + h * 0.18, x2: x + w * 0.78, y2: y + h * 0.18, stroke: "#f8fafc", "stroke-width": 2 });
        if (shape === "speakersVintage") rect({ x: x + w * 0.62, y: y + h * 0.76, width: w * 0.14, height: h * 0.07, fill: "#fbbf24" });
        break;
      case "watch":
      case "watchCheap":
        circle({ cx: x + w * 0.5, cy: y + h * 0.5, r: Math.min(w, h) * 0.3, fill: primary });
        circle({ cx: x + w * 0.5, cy: y + h * 0.5, r: Math.min(w, h) * 0.18, fill: secondary });
        line({ x1: x + w * 0.64, y1: y + h * 0.3, x2: x + w * 0.8, y2: y + h * 0.16, stroke: secondary });
        if (shape === "watchCheap") line({ x1: x + w * 0.34, y1: y + h * 0.7, x2: x + w * 0.66, y2: y + h * 0.7, stroke: "#6b442a", "stroke-width": 2 });
        break;
      case "violin":
      case "violinCase":
      case "violinStudent":
        ellipse({ cx: x + w * 0.5, cy: y + h * 0.38, rx: w * 0.28, ry: h * 0.16, fill: primary });
        ellipse({ cx: x + w * 0.5, cy: y + h * 0.62, rx: w * 0.28, ry: h * 0.16, fill: primary });
        line({ x1: x + w * 0.5, y1: y + h * 0.12, x2: x + w * 0.5, y2: y + h * 0.88, stroke: secondary });
        if (shape === "violinCase") rect({ x: x + w * 0.22, y: y + h * 0.08, width: w * 0.56, height: h * 0.84, fill: primary, opacity: 0.56 });
        if (shape === "violinStudent") line({ x1: x + w * 0.36, y1: y + h * 0.74, x2: x + w * 0.64, y2: y + h * 0.74, stroke: "#f8fafc", "stroke-width": 2 });
        break;
      case "rug":
      case "rugOpen":
      case "rugOpenFake":
        for (let i = 0; i < 5; i += 1) {
          line({ x1: x + 8, y1: y + 12 + i * 18, x2: x + w - 8, y2: y + 18 + i * 18, stroke: secondary, "stroke-width": 2 });
        }
        if (shape === "rugOpenFake") rect({ x: x + w * 0.1, y: y + h * 0.1, width: w * 0.8, height: h * 0.8, fill: "none", stroke: "#f8fafc", "stroke-width": 2 });
        break;
      default:
        circle({ cx: x + w * 0.5, cy: y + h * 0.5, r: Math.min(w, h) * 0.25, fill: secondary });
        line({ x1: x + 10, y1: y + h - 10, x2: x + w - 10, y2: y + 10, stroke: "#ffffff99" });
    }
  }

  function renderItemPreview(item) {
    const svg = svgEl("svg", {
      viewBox: "0 0 144 144",
      role: "img",
      class: "codex-preview-svg",
      "aria-label": item.name,
    });
    const group = svgEl("g", { class: `item-art ${qualityClass[item.quality]}` });
    const [cols, rows] = item.size;
    const maxSide = Math.max(cols, rows);
    const cell = Math.min(48, 116 / maxSide);
    const w = Math.max(56, cols * cell);
    const h = Math.max(56, rows * cell);
    const x = (144 - w) / 2;
    const y = (144 - h) / 2;

    svg.appendChild(svgEl("rect", { x: 8, y: 8, width: 128, height: 128, rx: 8, fill: "#111827", stroke: "#2f3642" }));
    addSvgShape(group, item.shape, x, y, w, h, item.colors);
    svg.appendChild(group);
    return svg;
  }

  function sortedCodexItems() {
    return window.AuctionItems.items
      .slice()
      .sort((a, b) => {
        const qualityDelta = (codexQualityOrder[a.quality] || 99) - (codexQualityOrder[b.quality] || 99);
        if (qualityDelta !== 0) return qualityDelta;

        const areaDelta = a.size[0] * a.size[1] - b.size[0] * b.size[1];
        if (areaDelta !== 0) return areaDelta;

        const valueDelta = a.value - b.value;
        if (valueDelta !== 0) return valueDelta;

        return a.name.localeCompare(b.name, "zh-Hans-CN");
      });
  }

  function renderWarehouse(state, onWarehouseClick) {
    const mount = document.getElementById("warehouseSvgMount");
    mount.innerHTML = "";
    const auction = state.auction;
    if (!auction) return;

    const { warehouse } = auction;
    const width = warehouse.width * warehouse.cellSize;
    const height = warehouse.height * warehouse.cellSize;
    const svg = svgEl("svg", {
      viewBox: `0 0 ${width} ${height}`,
      width,
      height,
      role: "img",
      class: `warehouse-svg ${state.selectedTool ? "aiming" : ""}`,
    });

    function eventToSvgPoint(event) {
      const matrix = svg.getScreenCTM();
      if (!matrix) return null;

      const point = svg.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      return point.matrixTransform(matrix.inverse());
    }

    const defs = svgEl("defs");
    const mask = svgEl("mask", { id: "warehouseMask" });
    mask.appendChild(svgEl("rect", { x: 0, y: 0, width, height, fill: "white" }));
    if (!auction.revealAll) {
      for (const hole of auction.holes) {
        mask.appendChild(svgEl("circle", { cx: hole.cx, cy: hole.cy, r: hole.r, fill: "black" }));
      }
    } else {
      mask.appendChild(svgEl("rect", { x: 0, y: 0, width, height, fill: "black" }));
    }
    defs.appendChild(mask);
    svg.appendChild(defs);

    svg.appendChild(svgEl("rect", { x: 0, y: 0, width, height, fill: "#2d241d" }));

    for (let x = 0; x <= warehouse.width; x += 1) {
      svg.appendChild(svgEl("line", { x1: x * warehouse.cellSize, y1: 0, x2: x * warehouse.cellSize, y2: height, stroke: "#ffffff1f", "stroke-width": 1 }));
    }
    for (let y = 0; y <= warehouse.height; y += 1) {
      svg.appendChild(svgEl("line", { x1: 0, y1: y * warehouse.cellSize, x2: width, y2: y * warehouse.cellSize, stroke: "#ffffff1f", "stroke-width": 1 }));
    }

    const itemLayer = svgEl("g");
    for (const item of warehouse.items) {
      const x = item.x * warehouse.cellSize + 4;
      const y = item.y * warehouse.cellSize + 4;
      const w = item.size[0] * warehouse.cellSize - 8;
      const h = item.size[1] * warehouse.cellSize - 8;
      const group = svgEl("g", { class: `item-art ${qualityClass[item.quality]}` });
      addSvgShape(group, item.shape, x, y, w, h, item.colors);
      if (auction.revealAll) {
        const label = svgEl("text", {
          x: x + w / 2,
          y: y + h - 10,
          "text-anchor": "middle",
          fill: "#fff",
          "font-size": 11,
          "paint-order": "stroke",
          stroke: "#111827",
          "stroke-width": 3,
        });
        label.textContent = item.name;
        group.appendChild(label);
      }
      itemLayer.appendChild(group);
    }
    svg.appendChild(itemLayer);

    const cover = svgEl("g", { mask: "url(#warehouseMask)" });
    cover.appendChild(svgEl("rect", { x: 0, y: 0, width, height, fill: "#080b10", opacity: 1 }));
    svg.appendChild(cover);

    for (const hole of auction.holes) {
      svg.appendChild(svgEl("circle", {
        cx: hole.cx,
        cy: hole.cy,
        r: hole.r,
        fill: "none",
        stroke: hole.visibility === "private" ? "#38bdf8" : "#fbbf24",
        "stroke-width": 3,
        "stroke-dasharray": hole.visibility === "private" ? "5 5" : "none",
      }));
    }

    if (state.selectedTool) {
      const cursor = svgEl("g", {
        class: `tool-cursor tool-cursor-${state.selectedTool}`,
        visibility: "hidden",
        "pointer-events": "none",
      });

      if (state.selectedTool === "wideLamp") {
        for (const [dx, dy] of [[0, 0], [-38, 24], [38, -24]]) {
          cursor.appendChild(svgEl("circle", { cx: dx, cy: dy, r: auction.tools.wideLamp.radius, fill: "none", stroke: "#38bdf8", "stroke-width": 3 }));
        }
      } else {
        const radius = auction.tools[state.selectedTool]?.radius || 32;
        cursor.appendChild(svgEl("circle", { cx: 0, cy: 0, r: radius, fill: "none", stroke: "#38bdf8", "stroke-width": 3 }));
      }

      cursor.appendChild(svgEl("line", { x1: -12, y1: 0, x2: 12, y2: 0, stroke: "#e0f2fe", "stroke-width": 2, "stroke-linecap": "round" }));
      cursor.appendChild(svgEl("line", { x1: 0, y1: -12, x2: 0, y2: 12, stroke: "#e0f2fe", "stroke-width": 2, "stroke-linecap": "round" }));
      cursor.appendChild(svgEl("circle", { cx: 0, cy: 0, r: 4, fill: "#e0f2fe", stroke: "#0284c7", "stroke-width": 2 }));
      svg.appendChild(cursor);

      svg.addEventListener("mousemove", (event) => {
        const point = eventToSvgPoint(event);
        if (!point) return;
        cursor.setAttribute("transform", `translate(${point.x} ${point.y})`);
        cursor.setAttribute("visibility", "visible");
      });

      svg.addEventListener("mouseleave", () => {
        cursor.setAttribute("visibility", "hidden");
      });
    }

    svg.addEventListener("click", (event) => {
      const point = eventToSvgPoint(event);
      if (!point) return;
      onWarehouseClick(point.x, point.y);
    });

    mount.appendChild(svg);
  }

  function renderBuyers(state) {
    const list = document.getElementById("buyerList");
    list.innerHTML = "";
    if (!state.auction) return;
    for (const buyer of state.auction.buyers) {
      const row = document.createElement("div");
      row.className = "buyer";
      row.innerHTML = `
        <div>
          <strong>${buyer.name}</strong>
          <span>${buyer.mood || buyer.style}</span>
        </div>
          <div class="buyer-bid">${buyer.lastBid ? money(buyer.lastBid) : "未出价"}</div>
      `;
      list.appendChild(row);
    }
  }

  function renderCodex(state) {
    const list = document.getElementById("codexList");
    const known = state.codex.unlocked.size;
    document.getElementById("codexSummary").textContent = `已知 ${known} / ${window.AuctionItems.items.length} 件物品`;
    list.innerHTML = "";

    for (const item of sortedCodexItems()) {
      const unlocked = state.codex.unlocked.has(item.id);
      const card = document.createElement("article");
      card.className = `codex-card ${unlocked ? "" : "locked"} ${qualityClass[item.quality]}`;

      const previewWrap = document.createElement("div");
      previewWrap.className = "codex-preview";
      if (unlocked) {
        previewWrap.appendChild(renderItemPreview(item));
      } else {
        previewWrap.classList.add("codex-preview-locked");
        previewWrap.textContent = "?";
      }
      card.appendChild(previewWrap);

      const content = document.createElement("div");
      content.className = "codex-card-body";

      if (unlocked) {
        content.innerHTML = `
          <div class="codex-title">
            <strong>${item.name}</strong>
            <span>${qualityLabels[item.quality]} · ${item.size[0]}x${item.size[1]}</span>
          </div>
          <p>${item.similarGroup || categoryLabels[item.category] || item.category} · ${money(item.value)}</p>
          <small>${item.traits.map((trait) => traitLabels[trait] || trait).join(" / ")}</small>
        `;
      } else {
        content.innerHTML = `
          <div class="codex-title">
            <strong>未知物品</strong>
            <span>${qualityLabels[item.quality]} · ${item.size[0]}x${item.size[1]}</span>
          </div>
          <p>结算时看见后解锁图鉴</p>
          <small>???</small>
        `;
      }

      card.appendChild(content);
      list.appendChild(card);
    }
  }

  function renderLog(state) {
    const log = document.getElementById("auctionLog");
    log.innerHTML = "";
    if (!state.auction) return;
    for (const entry of state.auction.log.slice(0, 14)) {
      const item = document.createElement("li");
      item.textContent = entry;
      log.appendChild(item);
    }
  }

  function renderRoundResults(state) {
    const mount = document.getElementById("roundResults");
    const auction = state.auction;
    mount.innerHTML = "";
    if (!auction) return;

    if (!auction.roundResults.length) {
      mount.innerHTML = `<p class="hint">降价钟开始后，最先按停的人会计入本轮报价。</p>`;
      return;
    }

    for (const result of auction.roundResults.slice().reverse()) {
      const row = document.createElement("div");
      row.className = "round-result";
      const bids = Object.entries(result.bids)
        .sort((a, b) => b[1] - a[1])
        .map(([id, value]) => `<span class="round-winner">${window.AuctionSystem.bidderName(state.auction, id)} 按停 ${money(value)}</span>`)
        .join("");
      row.innerHTML = `
        <strong>第 ${result.round} 轮：${window.AuctionSystem.bidderName(state.auction, result.winner)} 计入报价</strong>
        <div>${bids}</div>
      `;
      mount.appendChild(row);
    }
  }

  function updateAuctionClockDisplay(auction) {
    const clock = auction.clock;
    const currentPrice = window.AuctionSystem.priceAtClock(clock);
    document.getElementById("bidLabel").textContent = `第 ${auction.round} / ${auction.maxRounds} 轮`;
    document.getElementById("currentBidLabel").textContent = money(currentPrice);
    document.getElementById("clockMaxLabel").textContent = money(clock.ceiling);
    document.getElementById("clockMidLabel").textContent = money((clock.ceiling + clock.floor) / 2);
    document.getElementById("clockFloorLabel").textContent = money(clock.floor);

    const progress = clock.ceiling === clock.floor
      ? 0
      : Math.max(0, Math.min(1, (clock.ceiling - currentPrice) / (clock.ceiling - clock.floor)));
    const angle = progress * 360;
    document.getElementById("clockNeedle").style.transform = `translate(-50%, -100%) rotate(${angle}deg)`;
  }

  function toolStatusText(state, tool) {
    const config = state.auction?.tools?.[tool];
    if (!config) return "";
    if (config.freeUses > 0) return `免费 ${config.freeUses}`;
    return money(config.cost);
  }

  function updateToolButtons(state) {
    const toolIds = {
      flashlight: "toolFlashlight",
      wideLamp: "toolWideLamp",
      magnifier: "toolMagnifier",
    };
    const countIds = {
      flashlight: "flashlightCount",
      wideLamp: "wideLampCount",
      magnifier: "magnifierCount",
    };

    for (const tool of Object.keys(toolIds)) {
      const button = document.getElementById(toolIds[tool]);
      const counter = document.getElementById(countIds[tool]);
      counter.textContent = toolStatusText(state, tool);
      button.classList.toggle("selected", state.selectedTool === tool);
      button.disabled = !window.AuctionSystem.canUseTool(state, tool);
    }
  }

  function renderVenueChoices(state, targetId = "startVenueList", compact = false) {
    const mount = document.getElementById(targetId);
    const selectedId = state.selectedVenueId;
    mount.innerHTML = "";

    for (const venue of window.AuctionVenues) {
      const locked = state.money < venue.requiredMoney;
      const button = document.createElement("button");
      button.type = "button";
      button.className = `${compact ? "venue-button" : "start-venue-card"} ${selectedId === venue.id ? "selected" : ""}`;
      button.disabled = locked || state.gameOver || state.phase !== "venue";
      button.dataset.venueId = venue.id;
      button.innerHTML = `
        <strong>${venue.level}级 · ${venue.name}</strong>
        <span>入场门槛 ${money(venue.requiredMoney)} · 门票：本场期望均价 5%</span>
        <small>${locked ? "现金不足，暂时进不去" : venue.label}</small>
      `;
      mount.appendChild(button);
    }
  }

  function renderFamilyScreen(state) {
    const bill = window.AuctionSystem.prepareFamilyBill(state);
    const daysLeft = Math.max(0, state.debt.dueDay - state.day);
    document.getElementById("debtDaysLabel").textContent = `距离还款日 ${daysLeft} 天`;
    document.getElementById("debtAmountLabel").textContent = money(state.debt.amount);

    const memberList = document.getElementById("familyMemberList");
    memberList.innerHTML = "";
    for (const member of state.family.members) {
      const row = document.createElement("article");
      row.className = "family-member";
      row.innerHTML = `
        <strong>${member.name}</strong>
        <span>${member.role}</span>
        <small>${member.need}</small>
      `;
      memberList.appendChild(row);
    }

    const expenseList = document.getElementById("familyExpenseList");
    expenseList.innerHTML = "";
    for (const expense of bill.items) {
      const row = document.createElement("div");
      row.className = "family-expense";
      row.innerHTML = `<span>${expense.name}</span><strong>${money(expense.amount)}</strong>`;
      expenseList.appendChild(row);
    }

    document.getElementById("familyBillTotal").textContent = money(bill.total);
    document.getElementById("familyRiskHint").textContent = state.family.unpaidDays
      ? `已经拖欠 ${state.family.unpaidDays} 天，继续不支付会让家里状态更紧。`
      : "支付会减少现金，但拖欠会积累家庭压力。";

    const canPay = state.money >= bill.total && !state.gameOver;
    document.getElementById("payFamilyButton").disabled = !canPay;
    document.getElementById("skipFamilyButton").disabled = state.gameOver;
  }

  function renderGameOverScreen(state) {
    document.getElementById("gameOverTitle").textContent = state.gameWon ? "债务还清" : "挑战失败";
    document.getElementById("gameOverSummary").textContent = state.gameWon
      ? "你赶在还款日前把钱凑齐了，今晚终于能睡个安稳觉。"
      : `还款日到了，你没有凑够 ${money(state.debt.amount)}。`;
    document.getElementById("gameOverMoney").textContent = money(state.money);
    document.getElementById("gameOverDebt").textContent = money(state.debt.amount);
    document.getElementById("gameOverUnpaid").textContent = `${state.family.unpaidDays} 天`;
  }

  function renderSettlementReview(settlement) {
    const strongest = settlement.items
      .slice()
      .sort((a, b) => b.rolledValue - a.rolledValue)
      .slice(0, 3);
    const worst = settlement.won
      ? settlement.items
        .slice()
        .sort((a, b) => (a.itemProfit || 0) - (b.itemProfit || 0))
        .slice(0, 2)
      : [];

    const strongHtml = strongest.map((item) => `
      <li>
        <span>${item.name}</span>
        <strong>${money(item.rolledValue)}</strong>
      </li>
    `).join("");

    const worstHtml = worst.length
      ? `<div class="settlement-review-list"><h4>拖累利润</h4><ul>${worst.map((item) => `
          <li>
            <span>${item.name}</span>
            <strong class="${(item.itemProfit || 0) >= 0 ? "positive" : "negative"}">${(item.itemProfit || 0) >= 0 ? "+" : ""}${money(item.itemProfit || 0)}</strong>
          </li>
        `).join("")}</ul></div>`
      : "";

    return `
      <section class="settlement-review">
        <div class="settlement-review-lists">
          <div class="settlement-review-list">
            <h4>主要价值来源</h4>
            <ul>${strongHtml}</ul>
          </div>
          ${worstHtml}
        </div>
      </section>
    `;
  }

  function renderSettlement(state) {
    const dialog = document.getElementById("settlementDialog");
    const inline = document.getElementById("settlementInline");
    const inlineTitle = document.getElementById("settlementInlineTitle");
    const inlineBody = document.getElementById("settlementInlineBody");
    const banner = document.getElementById("settlementBanner");
    const bannerTitle = document.getElementById("settlementBannerTitle");
    const bannerSummary = document.getElementById("settlementBannerSummary");
    const settlement = state.settlement;
    if (!settlement) {
      if (dialog.open) dialog.close();
      inline.classList.add("hidden");
      inlineBody.innerHTML = "";
      banner.classList.add("hidden");
      bannerSummary.textContent = "";
      return;
    }

    const winnerName = settlement.won
      ? "你"
      : state.auction.buyers.find((buyer) => buyer.id === settlement.winner)?.name || "其他买家";
    const title = settlement.gameWon
      ? "目标达成"
      : settlement.gameLost
        ? "挑战失败"
        : settlement.won
          ? "仓库拍下成功"
          : settlement.winner === "none"
            ? "本仓放弃"
            : `${winnerName} 拍下仓库`;
    document.getElementById("settlementTitle").textContent = title;
    inlineTitle.textContent = title;
    bannerTitle.textContent = title;
    bannerSummary.textContent = settlement.won
      ? `最终支付均价 ${money(settlement.finalBid)}，本轮盈亏 ${money(settlement.profit)}。`
      : `${settlement.reason}；本轮支付 ${money(settlement.totalCost)}，仓库内容已写入图鉴。`;
    if (settlement.gameWon) {
      bannerSummary.textContent = `现金达到 ${money(state.money)}，目标完成。`;
    }
    if (settlement.gameLost) {
      bannerSummary.textContent = `期限已到，现金 ${money(state.money)} 未达到目标 ${money(state.goalMoney)}。`;
    }
    const body = document.getElementById("settlementBody");
    const reviewHtml = renderSettlementReview(settlement);
    const items = settlement.items
      .slice()
      .sort((a, b) => b.rolledValue - a.rolledValue)
      .map((item) => {
        const itemProfit = item.itemProfit || 0;
        const costText = settlement.won ? `成本 ${money(item.allocatedCost)}` : "未拍下";
        const profitText = settlement.won ? `${itemProfit >= 0 ? "+" : ""}${money(itemProfit)}` : "已记录图鉴";
        return `
          <li class="settlement-item-detail">
            <div>
              <span>${item.name}</span>
              <small>${item.size[0]}x${item.size[1]} · ${costText}</small>
            </div>
            <div class="item-money">
              <strong>${money(item.rolledValue)}</strong>
              <em class="${itemProfit >= 0 ? "positive" : "negative"}">${profitText}</em>
            </div>
          </li>
        `;
      })
      .join("");
    const html = `
      <div class="settlement-stats">
        <div><span>门票费</span><strong>-${money(settlement.entranceFee)}</strong></div>
        <div><span>支付均价</span><strong>-${money(settlement.finalBid)}</strong></div>
        <div><span>自动出售</span><strong>${money(settlement.revenue)}</strong></div>
        <div><span>本轮盈亏</span><strong class="${settlement.profit >= 0 ? "positive" : "negative"}">${money(settlement.profit)}</strong></div>
      </div>
      <p class="settlement-note">${settlement.reason}。还款目标：第 ${state.debt.dueDay} 天结束时准备 ${money(state.debt.amount)}。</p>
      ${reviewHtml}
      <h3>${settlement.won ? "获得物品" : "仓库内容揭晓"}</h3>
      <p class="settlement-note">${settlement.won ? "单件盈亏按门票费和最终支付均价的合计成本，依物品占用格数分摊计算。" : "你没有拍下仓库，但揭晓内容已写入图鉴。"}</p>
      <ul class="settlement-items">${items}</ul>
    `;
    body.innerHTML = html;
    inlineBody.innerHTML = html;
    inline.classList.remove("hidden");
    banner.classList.remove("hidden");
    document.getElementById("nextAuctionButton").disabled = state.gameOver;
    document.getElementById("nextAuctionInlineButton").disabled = state.gameOver;
    document.getElementById("nextAuctionBannerButton").disabled = state.gameOver;

    try {
      if (!dialog.open && typeof dialog.showModal === "function") dialog.showModal();
    } catch (error) {
      inline.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  function render(state, handlers) {
    const auction = state.auction;
    window.AuctionSystem.ensureSettlement?.(state);

    const venueScreen = document.getElementById("venueScreen");
    const familyScreen = document.getElementById("familyScreen");
    const gameLayout = document.getElementById("gameLayout");
    const gameOverScreen = document.getElementById("gameOverScreen");
    venueScreen.classList.toggle("hidden", state.phase !== "venue" || state.gameOver);
    familyScreen.classList.toggle("hidden", state.phase !== "family" || state.gameOver);
    gameLayout.classList.toggle("hidden", state.phase !== "auction");
    gameOverScreen.classList.toggle("hidden", !state.gameOver);

    const phaseLabel = state.gameOver
      ? state.gameWon ? "债务还清" : "挑战失败"
      : state.phase === "venue" ? "选择拍卖场"
        : state.phase === "family" ? "家庭开销"
          : "仓库拍卖";

    document.getElementById("dayLabel").textContent = `第 ${state.day} 天 · ${phaseLabel}`;
    document.getElementById("goalLabel").textContent = `还款：第 ${state.debt.dueDay} 天还 ${money(state.debt.amount)}`;
    document.getElementById("moneyLabel").textContent = money(state.money);

    renderVenueChoices(state);
    document.getElementById("startVenueButton").disabled = state.gameOver || state.phase !== "venue" || state.money < (window.AuctionSystem.getSelectedVenue(state)?.requiredMoney || 0);

    if (state.gameOver) {
      renderGameOverScreen(state);
    }

    if (state.phase === "family" && !state.gameOver) {
      renderFamilyScreen(state);
    }

    if (!auction) {
      renderCodex(state);
      renderSettlement(state);
      return;
    }

    document.getElementById("warehouseName").textContent = `${auction.warehouse.profile.level}级 · ${auction.warehouse.profile.name}`;
    document.getElementById("warehouseProfile").textContent = auction.warehouse.profile.label;
    updateAuctionClockDisplay(auction);

    const phaseText = auction.phase === "bidding" && !auction.clock?.running
      ? `起拍价 ${money(auction.clock.ceiling)}。点击开始竞拍后开始降价。`
      : auction.phase === "bidding"
        ? "正在降价，最先按停者计入本轮报价。"
      : "拍卖已结束";
    const resultHighest = state.settlement
      ? `已成交 · ${state.settlement.won ? "你拍下仓库" : `${window.AuctionSystem.bidderName(auction, state.settlement.winner)} 拍下仓库`}`
      : phaseText;
    document.getElementById("highestBidderLabel").textContent = resultHighest;

    updateToolButtons(state);
    document.getElementById("toolHint").textContent = state.selectedTool
      ? `点击仓库使用${toolLabels[state.selectedTool] || "道具"}，本轮道具行动将被消耗。`
      : auction.materialHints[0] || "每轮报价前最多使用一次道具。手电筒前 3 次免费，其他道具需要付费。";

    const stopClockButton = document.getElementById("stopClockButton");
    stopClockButton.textContent = auction.clock?.running ? "按停计价" : "开始竞拍";
    stopClockButton.disabled = Boolean(state.settlement) || auction.phase !== "bidding" || auction.clock?.stopped;
    document.getElementById("passButton").disabled = Boolean(state.settlement);

    renderWarehouse(state, handlers.onWarehouseClick);
    renderBuyers(state);
    renderCodex(state);
    renderLog(state);
    renderRoundResults(state);
    renderSettlement(state);
  }

  window.Renderer = {
    render,
    money,
  };

  window.RendererLabels = {
    category(category) {
      return categoryLabels[category] || category;
    },
    trait(trait) {
      return traitLabels[trait] || trait;
    },
    tool(tool) {
      return toolLabels[tool] || tool;
    },
  };
})();
