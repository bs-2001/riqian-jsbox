var imgData = false
var targetDate = new Date()
var isCalendar = true
var isMarkdown = true
var txtContent = ""
var selTheme = 1
var selFont = 0
var passData
var insertFontDef

const fontURL = "https://bs-2001.github.io/assets/fonts/"

$ui.render({
    props: {
        id: "tq",
        title: "JsBox日签",
        bgcolor: $color("#efefef")
    },
    views: [{
        type: "list",
        props: {
            id: "start",
            scrollEnabled: false,
            data: [
                {
                    title: "选择图片",
                    rows: [
                        {
                            type: "image",
                            props: {
                                src: "assets/add.png",
                                bgcolor: $color("clear"),
                                borderWidth: 0
                            },
                            layout: function (make, view) {
                                make.center.equalTo(view.super)
                                make.size.equalTo($size(120, 120))
                            },
                            events: {
                                tapped: function (sender) {
                                    $photo.pick({
                                        format: "image",
                                        handler: function (resp) {
                                            if (resp.image) {
                                                imgData = resp.image.jpg(0.8)
                                                insertPic(imgData)
                                            }

                                        }
                                    })
                                }
                            }
                        }
                    ]
                },
                {
                    title: "编辑选项",
                    rows: [
                        {
                            type: "view",
                            props: {
                            },
                            views: [
                                {
                                    type: "label",
                                    props: {
                                        text: "文字",
                                        align: $align.left,
                                        textColor: $color("#666666")
                                    },
                                    layout: function (make, view) {
                                        make.centerY.equalTo(view.super)
                                        make.left.equalTo(14)
                                    }
                                },
                                {
                                    type: "label",
                                    props: {
                                        text: "❯",
                                        font: $font(24),
                                        textColor: $color("#666666")
                                    },
                                    layout: function (make, view) {
                                        make.centerY.equalTo(view.super)
                                        make.right.equalTo(-10)
                                    }
                                }
                            ],
                            layout: $layout.fill
                        },
                        {
                            type: "view",
                            props: {
                            },
                            views: [
                                {
                                    type: "label",
                                    props: {
                                        text: "主题",
                                        align: $align.left,
                                        textColor: $color("#666666")
                                    },
                                    layout: function (make, view) {
                                        make.centerY.equalTo(view.super)
                                        make.left.equalTo(14)
                                    }
                                },
                                {
                                    type: "label",
                                    props: {
                                        text: "❯",
                                        font: $font(24),
                                        textColor: $color("#666666")
                                    },
                                    layout: function (make, view) {
                                        make.centerY.equalTo(view.super)
                                        make.right.equalTo(-10)
                                    }
                                }
                            ],
                            layout: $layout.fill
                        },
                        {
                            type: "view",
                            props: {
                            },
                            views: [
                                {
                                    type: "label",
                                    props: {
                                        text: "更改字体",
                                        align: $align.left,
                                        textColor: $color("#666666")
                                    },
                                    layout: function (make, view) {
                                        make.centerY.equalTo(view.super)
                                        make.left.equalTo(14)
                                    }
                                },
                                {
                                    type: "label",
                                    props: {
                                        text: "❯",
                                        font: $font(24),
                                        textColor: $color("#666666")
                                    },
                                    layout: function (make, view) {
                                        make.centerY.equalTo(view.super)
                                        make.right.equalTo(-10)
                                    }
                                }
                            ],
                            layout: $layout.fill
                        },
                        {
                            type: "view",
                            props: {
                            },
                            views: [
                                {
                                    type: "label",
                                    props: {
                                        text: "显示日历",
                                        align: $align.left,
                                        textColor: $color("#666666")
                                    },
                                    layout: function (make, view) {
                                        make.centerY.equalTo(view.super)
                                        make.left.equalTo(14)
                                    }
                                },
                                {
                                    type: "switch",
                                    props: {
                                        on: isCalendar,
                                        onColor: $color("#666666")
                                    },
                                    layout: function (make, view) {
                                        make.centerY.equalTo(view.super)
                                        make.right.equalTo(-10)
                                    },
                                    events: {
                                        changed: function (sender) {
                                            isCalendar = sender.on
                                        }
                                    }
                                }
                            ],
                            layout: $layout.fill
                        },
                        {
                            type: "view",
                            props: {
                                id: "lineCalendar"
                            },
                            views: [
                                {
                                    type: "label",
                                    props: {
                                        text: "更改日期",
                                        align: $align.left,
                                        textColor: $color("#666666")
                                    },
                                    layout: function (make, view) {
                                        make.centerY.equalTo(view.super)
                                        make.left.equalTo(14)
                                    }
                                },
                                {
                                    type: "label",
                                    props: {
                                        id: "displayDate",
                                        text: targetDate.toLocaleDateString(),
                                        font: $font(18),
                                        textColor: $color("#666666")
                                    },
                                    layout: function (make, view) {
                                        make.centerY.equalTo(view.super)
                                        make.right.equalTo(-10)
                                    }
                                }
                            ],
                            layout: $layout.fill
                        }
                    ]
                }
            ]
        },


        layout: $layout.fill,
        events: {
            rowHeight: function (sender, indexPath) {
                if (indexPath.row == 0 && indexPath.section == 0) {
                    return 140
                } else {
                    return 50
                }
            },
            didSelect: function (sender, indexPath, data) {
                if (indexPath.section == 1 && indexPath.row == 0) {
                    $ui.push({
                        props: {
                            title: "编辑文字",
                            bgcolor: $color("#efefef"),
                            //statusBarHidden: true,
                            navButtons: [
                                {
                                    title: "提交",
                                    icon: "064", // Or you can use icon name
                                    handler: function () {
                                        txtContent = $("editor").text
                                        $ui.pop()
                                    }
                                }
                            ]
                        },
                        views: [
                            {
                                type: "text",
                                props: {
                                    id: "editor",
                                    borderColor: $color("#dddddd"),
                                    borderWidth: 1,
                                    bgcolor: $color("#ffffff"),
                                    radius: 10,
                                    align: $align.left,
                                    textColor: $color("#666666"),
                                    font: $font(16),
                                    text: txtContent
                                },
                                layout: function (make, view) {
                                    make.height.equalTo(250)
                                    make.top.left.right.inset(10)
                                },
                                events: {
                                    didEndEditing: function(sender) {
                                        txtContent = sender.text
                                    }
                                }
                            },
                            {
                                type: "switch",
                                props: {
                                    on: isMarkdown,
                                    onColor: $color("#666666")
                                },
                                layout: function (make, view) {
                                    make.top.equalTo($("editor").bottom).offset(10)
                                    make.left.inset(10)
                                },
                                events: {
                                    changed: function(sender) {
                                        isMarkdown = sender.on
                                    }
                                }
                            },
                            {
                                type: "label",
                                props: {
                                    text: "Markdown",
                                    font: $font(16)
                                },
                                layout: function (make, view) {
                                    make.top.equalTo($("editor").bottom).offset(14)
                                    make.left.equalTo($("switch").right).offset(10)
                                }
                            }
                        ]
                    })
                    $("editor").focus()
                }
                if (indexPath.section == 1 && indexPath.row == 1) {
                    var styles = [1,2,3,4,5,6,7,8]
                    var styleSelector = new Array()
                    styles.map(function(val) {
                        styleSelector.push({
                            image: {
                                src: "assets/styles/t"+val+"s.jpg",
                                borderColor: (selTheme == val) ? $color("#FF0000") : $color("#dddddd"),
                                borderWidth: (selTheme == val) ? 2 : 1
                            }
                        })
                    })
                    $ui.push ({
                        props: {
                            title: "选择主题",
                            bgcolor: $color("#efefef"),
                            //statusBarHidden: true,
                            navButtons: [
                                {
                                    title: "确认",
                                    icon: "064", // Or you can use icon name
                                    handler: function () {
                                        $ui.pop()
                                    }
                                }
                            ]
                        },
                        views: [
                        {
                            type: "matrix",
                            props: {
                                data: styleSelector,
                                columns: 2,
                                selectable: true,
                                itemHeight: 280,
                                spacing: 10,
                                template: {
                                    props: {},
                                    views: [
                                        {
                                            type: "image",
                                            props: {
                                                radius: 6,
                                                borderWidth: 1
                                            },
                                            layout: $layout.fill
                                        }
                                    ]
                                }
                            },
                            layout: $layout.fill,
                            events: {
                                didSelect: function(sender, indexPath, data) {
                                    var oldSelThemeID=selTheme-1
                                    if (oldSelThemeID==indexPath.row) {
                                        $ui.pop()
                                        return
                                    }
                                    selTheme=indexPath.item+1
                                    data.image.borderColor=$color("#FF0000")
                                    data.image.borderWidth=2
                                    let oldData=sender.data
                                    oldData[indexPath.row]=data                                    
                                    let oldSelData=oldData[oldSelThemeID]
                                    oldSelData.image.borderColor=$color("#dddddd")
                                    oldSelData.image.borderWidth=1
                                    oldData[oldSelThemeID]=oldSelData
                                    sender.data=oldData 
                                }
                            }
                        }
                        ]
                    })
                }
                if (indexPath.section == 1 && indexPath.row == 2) {
                    $app.tips ("将下载字体，可能产生流量。虽公开资料显示其为免费授权字体，但应仅供个人使用，切勿商用。任何因字体产生的纠纷与脚本作者和JSBox无尤。")
                    var styles = ["苹方（系统字体）", "方正楷体", "新蒂黑板报体", "新蒂下午茶体"]
                    styles[selFont]="○ "+styles[selFont]
                    $ui.menu({
                        items: styles,
                        index: selFont,
                        handler: function(title, idx) {
                            selFont=idx
                        }
                    })
                }
                if (indexPath.section == 1 && indexPath.row == 4) {
                    $picker.date({
                        props: {
                            date: targetDate,
                            mode: 1
                        },
                        events: {
                            changed: function(sender) {
                                targetDate = sender.date
                                $("displayDate").text = targetDate.toLocaleDateString()
                            }
                        }
                    })
                }
            }
        }
    },
    {
        type: "button",
        props: {
            title: "生成日签"
        },
        layout: function(make, view) {
            make.centerX.equalTo(view.super)
            make.width.equalTo(view.super).dividedBy(2)
            make.height.equalTo(40)
            make.bottom.equalTo(view.super).offset(-26)
        },
        events: {
            tapped: function (sender) {
                if (txtContent == "") {
                    $ui.toast ("还没有写东西呢！")
                }
                else if (!imgData) {
                    $ui.toast ("还没有选照片呢！")
                }
                else {
                    passData = {
                        txtContent: isMarkdown ? $text.markdownToHtml(txtContent).replace(/(\r\n|\n|\r)/gm, '') : $text.HTMLEscape(txtContent).replace(/(\r\n|\n|\r)/gm, '<br>'),
                        imgData: $text.base64Encode(imgData),
                        targetDate: ''
                    }
                    if (isCalendar) {
                        passData.targetDate = targetDate.getTime()
                    }
                    if (selFont!=0) {
                        var downloadFonts = ['', 'FZKT', 'XDHBB', 'XDXWC']
                        var requiredFont = downloadFonts[selFont]+".ttf"
                        if (!$file.exists("assets/fonts/"+requiredFont)) {
                            getAFont (requiredFont)
                            var discountinued=true
                            $ui.alert("这是你第一次使用该字体，请等待字体下载完成后再次点击生成按钮。")   
                        }
                        else {
                            var discountinued=false
                            var fontBase64=$text.base64Encode($file.read("assets/fonts/"+requiredFont))
                            insertFontDef="<style>@font-face{font-family: Custom; src: url(data:application/x-font-truetype;charset=utf-8;base64,"+fontBase64.replace(/(\r\n|\n|\r)/gm, '')+");}</style>"                            
                        }
                    } else {
                      insertFontDef=''
                    }
                    if (!discountinued) {
                        $ui.push({
                            props: {
                                title: "正在生成...",
                                statusBarHidden: true,
                                //navBarHidden: true
                            },
                            views: [{
                                type: "web",
                                props: {
                                    html: $file.read("templates/t"+selTheme+".html").string.replace(/<\/head>/gm, insertFontDef+"</head>"),
                                    toolbar: false,
                                    //scrollEnabled: false,
                                    showsProgress: false,
                                    script: "document.getElementById('word').innerHTML='"+passData.txtContent+"'; var img = \"url('data:image/jpeg;base64," + passData.imgData.replace(/(\r\n|\n|\r)/gm, '') + "')\";document.getElementById('pic').style.backgroundImage=img;document.getElementById('pic').style.backgroundPosition='center'; document.getElementById('pic').style.backgroundSize='cover'; renderCalendar("+passData.targetDate+"); $notify('saveScreenshot',{e:1});"
                                },
                                layout: function(make,view) {
                                    make.left.top.inset(0)
                                    make.width.equalTo(view.super)
                                    make.height.equalTo(700)
                                },
                                events: {
                                    saveScreenshot: function(sender) {
                                        $delay(0.5, function() {
                                            var pngF = $("web").snapshot
                                            $ui.pop()
                                            
                                            $ui.push({
                                                props: {
                                                    title: "预览日签"
                                                },
                                                views: [{
                                                    type: "image",
                                                    props: {
                                                        data: pngF.png
                                                    },
                                                    events: {
                                                        tapped: function () {
                                                            $share.sheet ({
                                                                items: pngF,
                                                                handler: function(success) {
                                                                    $ui.pop()
                                                                }
                                                            })
                                                        }
                                                    },
                                                    layout: $layout.fill
                                                }]

                                            })
                                            $ui.toast("点击图片保存或分享。")                                   
                                        })
                                    }
                                }
                            }]
                        })
                    }
                }
            }
        }
    }
    ]
})

function insertPic(imageData) {
    $("start").cell($indexPath(0, 0)).add({
        type: "image",
        props: {
            data: imageData
        },
        layout: function (make, view) {
            make.center.equalTo(view.super)
            make.size.equalTo($size(120, 120))
        }
    })
}

function getAFont(font) {
    $ui.loading(true)
    $http.download({
        url: fontURL+font,
        progress: function(bytesWritten, totalBytes) {
            var percentage = bytesWritten * 1.0 / totalBytes
        },
        handler: function(resp) {
            var file = resp.data
            $file.write({
                data: file,
                path: "assets/fonts/"+font
            })
            $ui.loading(false)
        }
    })
}