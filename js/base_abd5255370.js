define("wap/showcase/base/fuwuhover", ["require", "zenjs/util/args"],
function(e) {
    var o = e("zenjs/util/args"),
    t = $('<div class="fuwu-hover-container"><p class="pull-left">感觉不错? 赶紧联系服务商吧!</p><a class="btn btn-green pull-right" href="">去服务商主页</a></div>');
    return function() {
        var e = o.get("fpd");
        e && "" !== e && (t.find("a").attr("href", _global.wap_url.wap + "/fuwu/provider/" + e + "/detail"), $("body").append(t))
    }
}),
define("bower_components/imagePreview/check_host", ["require"],
function(e) {
    return function(e) {
        for (var o = ["imgqn.koudaitong.com", "kdt-img.koudaitong.com", "img.yzcdn.cn", "dn-kdt-img.qbox.me"], t = !1, n = 0, a = o.length; n < a; n++) if (e.indexOf(o[n]) > -1) {
            t = !0;
            break
        }
        return t
    }
}),
define("bower_components/imagePreview/views/wx_preview", ["../check_host"],
function(e) {
    function o(o) {
        var t = o.attr("data-src") || o.attr("src");
        if (!e(t)) return t;
        var n = t.replace(/!.*?\.jpg/i, "!640x320.jpg").replace(/\?imageView2\/.*/i, "!640x320.jpg");
        return 0 === n.indexOf("//") && (n = window.location.protocol + n),
        n
    }
    function t(e) {
        var o, t = e.closest("a");
        return !! (t.length && (o = t.attr("href")) && /^(http|tel|mailto|#)/i.test(o))
    }
    function n() {
        var e = o($(this));
        i(e, [e])
    }
    var a = [],
    i = function(e, o) {
        window.WeixinJSBridge && window.WeixinJSBridge.invoke("imagePreview", {
            current: e,
            urls: o
        })
    },
    s = {
        init: function(e) {
            e = e ? e: ".js-view-image-list";
            var s = $(e);
            if (!s.data("swp-preview-init")) {
                s.data("swp-preview-init", !0);
                $(".js-view-image").each(function() {
                    var e = $(this),
                    n = o(e);
                    t(e) || e.width() >= 0 && n && (a.push(n), e.on("click",
                    function() {
                        i(n, a)
                    }))
                }),
                s.each(function(e) {
                    var n = $(this);
                    n.on("click", "img",
                    function(e) {
                        var a = n.find(".js-view-image-item");
                        if (0 === a.length && (a = n.find("img")), !t($(e.target))) {
                            a = a.map(function() {
                                return o($(this))
                            }).toArray();
                            var s = o($(this));
                            a.indexOf(s) < 0 && (a = [s]),
                            i(s, a)
                        }
                    })
                }),
                $(document.body).off("click", ".js-view-single-image", n).on("click", ".js-view-single-image", n)
            }
        },
        clear: function() {
            a = []
        }
    };
    return window.imagePreview = s,
    s
}),
define("bower_components/last_position/main", ["require", "zenjs/util/args"],
function(e) {
    function o(e) {
        function o() {
            clearTimeout(f);
            var e = a.scrollTop();
            n.forEach(function(e, o) {
                var t = $(e);
                0 !== t.length && t.each(function(o, t) {
                    try {
                        sessionStorage.setItem(d + "_" + e + "_" + o, $(t).css("height"))
                    } catch(e) {}
                })
            });
            try {
                sessionStorage.setItem(d, e)
            } catch(e) {}
        }
        if (location && sessionStorage) {
            for (var n = e.needMemoryClass || [], a = $(window), i = ["sf", "fm", "reft", "spm"], s = location.href, r = 0, l = i.length; r < l; r++) s = t.remove(s, i[r]);
            var c, d = location.pathname + "?" + (s.split("?")[1] || "");
            try {
                c = parseInt(sessionStorage.getItem(d))
            } catch(e) {
                c = 0
            }
            n.forEach(function(e, o) {
                var t = $(e);
                if (0 !== t.length) {
                    var n;
                    t.each(function(o, t) {
                        try {
                            n = sessionStorage.getItem(d + "_" + e + "_" + o)
                        } catch(e) {
                            n = "auto"
                        }
                        $(t).css({
                            "min-height": n
                        })
                    })
                }
            });
            var u = parseInt(a.height()) + c;
            $("body").css({
                "min-height": u
            }),
            c > 0 && (a.scrollTop(c), setTimeout(function() {
                a.trigger("scroll")
            },
            3e3));
            var f;
            a.scroll(function() {
                setTimeout(o, 1e3)
            })
        }
    }
    var t = e("zenjs/util/args");
    return o
}),
function() {
    function e() {
        clearTimeout(a),
        o.addClass("done")
    }
    var o = $(".js-tpl-weixin-list-item"),
    t = $(".js-tpl-weixin-bg");
    if (! (t.length <= 0)) {
        var n = t[0],
        a = setTimeout(function() {
            e()
        },
        2e3);
        n.onload = n.onerror = n.onabort = e,
        n.complete && e()
    }
} (),
function() {
    var e = $(".js-tpl-shop");
    e.length && $._ajax({
        url: "/v2/showcase/homepage/goodscount.json",
        type: "GET",
        dataType: "json",
        data: {
            kdt_id: window._global.kdt_id
        }
    }).done(function(o) {
        if (0 == +o.code) {
            var t = e.find(".js-all-goods"),
            n = e.find(".js-new-goods"),
            a = e.find(".js-order"),
            i = o.data,
            s = "";
            s = (i.all_goods.count + "").length,
            t.find("a").attr("href", i.all_goods.url),
            t.find(".count").html(i.all_goods.count).addClass("l-" + s),
            s = (i.new_goods.count + "").length,
            n.find("a").attr("href", i.new_goods.url),
            n.find(".count").html(i.new_goods.count).addClass("l-" + s),
            a.find("a").attr("href", i.order.url)
        }
    })
} (),
function() {
    $(".js-select-coupon").on("click",
    function() {
        var e = $(this),
        o = window.motify;
        $._ajax({
            url: "/v2/ump/promocard/fetchalias.json",
            type: "POST",
            data: {
                kdt_id: e.data("kdt-id"),
                id: e.data("id")
            }
        }).done(function(e) {
            0 == +e.code ? window.location.href = e.data.url: o.log(e.msg || "网络错误")
        }).fail(function() {
            o.log("网络错误")
        })
    })
} (),
window.init_custom_notice = function(e) {
    var o = $(".js-scroll-notice", $(e || "body"));
    o.length && o.each(function() {
        var e, o, t = $(this),
        n = t.parents(".custom-notice-inner"),
        a = n.width();
        t.parent().css("width", $(window).width() - 20);
        var i = document.createElement("span");
        i.innerText = t.text(),
        i.style.whiteSpace = "nowrap",
        i.style.fontSize = "12px",
        document.body.appendChild(i),
        o = i.offsetWidth + 20,
        document.body.removeChild(i),
        t.removeClass("scroll-notice-default"),
        o <= a || (t.css("width", o), t.addClass("scroll-notice"), e = Math.ceil((o + a) / 40), t.css({
            "-webkit-animation-duration": e + "s",
            "-moz-animation-duration": e + "s",
            "animation-duration": e + "s"
        }))
    })
},
window.init_custom_notice(),
define("wap/showcase/homepage/homepage",
function() {}),
function() {
    function e(e, o) {
        var t = !isNaN( + o) && null !== o;
        n.html(e || "会员"),
        a.html(t ? o: "暂无数据"),
        i.removeClass("hide")
    }
    function o(e) {
        var o = $.Deferred();
        return $._ajax({
            dataType: "jsonp",
            url: e
        }).done(function(e) {
            0 == +e.code ? o.resolve(e) : o.reject()
        }).fail(function() {
            o.reject()
        }),
        o
    }
    function t() {
        var e = $.Deferred();
        return $._ajax({
            url: "/v2/ump/pointsstore/externalPoint.json"
        }).done(function(o) {
            0 == +o.code ? e.resolve(o) : e.reject()
        }).fail(function() {
            e.reject()
        }),
        e
    }
    var n = $(".js-custom-level"),
    a = $(".js-custom-point"),
    i = $(".js-custom-level-title-section");
    if (! ( + _global.fans_id <= 0 && +_global.buyer_id <= 0)) {
        var s = window._global.wap_url.wap + "/showcase/component/point.jsonp?" + $.param({
            kdt_id: window._global.kdt_id
        }); (n.length > 0 || a.length > 0) &&
        function() {
            var e = $.Deferred();
            return $._ajax({
                url: "/v2/ump/pointsstore/assertUseExternalPoint.json"
            }).done(function(o) {
                0 === o.code ? e.resolve(o) : e.reject()
            }).fail(function() {
                e.reject()
            }),
            e
        } ().done(function(n) {
            n.data ? $.when(o(s), t()).done(function(o, t) {
                0 == +o.code && 0 == +t.code && e(o.data.nickname, t.data.value)
            }) : o(s).done(function(o) {
                0 == +o.code && e(o.data.nickname, o.data.point)
            })
        }).fail(function() {
            o(s).done(function(o) {
                0 == +o.code && e(o.data.nickname, o.data.point)
            })
        })
    }
} (),
define("wap/uc/title",
function() {}),
define("wap/components/app_h5/main", ["require", "exports", "module"],
function(e, o, t) {
    t.exports = {
        currentUrl: "",
        currentTime: Date.now(),
        doCall: function(e, o) {
            window.onReady("YouzanJSBridge",
            function() {
                window.YouzanJSBridge.doCall(e, o)
            })
        },
        compareVersion: function(e, o) {
            for (e = e.split(".").join(""), o = o.split(".").join(""); e.length !== o.length;) e.length > o.length ? o += "0": e += "0";
            return e = Number(e),
            o = Number(o),
            e > o ? "gt": e === o ? "eq": "lt"
        },
        eq: function(e, o) {
            return "eq" === this.compareVersion(e, o)
        },
        gte: function(e, o) {
            var t = this.compareVersion(e, o);
            return "eq" === t || "gt" === t
        },
        lte: function(e, o) {
            var t = this.compareVersion(e, o);
            return "eq" === t || "lt" === t
        },
        configNative: function(e) {
            this.doCall("configNative", e)
        },
        getData: function(e, o) {
            o.datatype = e,
            this.doCall("getData", o)
        },
        putData: function(e, o) {
            if ("youzanwxd" === _global.platform) if (this.gte(_global.platform_version, "1.5.0")) o.datatype = e,
            this.doCall("putData", o);
            else switch (e) {
            case "supplierInfo":
                this.doCall("tellSupplierInfo", {
                    supplier_kdt_id: o.supplier_kdt_id
                });
                break;
            case "goodsInfo":
                this.doCall("tellGoodsInfo", {
                    goods_id: o.goods_id
                })
            } else o.datatype = e,
            this.doCall("putData", o)
        },
        gotoWebview: function(e) {
            if (this.currentUrl === e.url && Date.now() - this.currentTime < 100) this.currentTime = Date.now();
            else if (this.currentUrl = e.url, this.currentTime = Date.now(), "youzanwxd" === _global.platform) if (this.gte(_global.platform_version, "1.5.0")) this.doCall("gotoWebview", e);
            else switch (e.page) {
            case "supplierHomepage":
                this.doCall("goHomePage", {
                    homeurl: e.url,
                    name: e.name
                });
                break;
            case "goodsList":
                this.doCall("viewGoodsList", {
                    url: e.url
                });
                break;
            case "goodsDetail":
                this.doCall("viewGoodsDetail", {
                    detail_url: e.url,
                    average_profit: e.average_profit,
                    alias: e.alias,
                    seller_goods_alias: e.seller_goods_alias
                });
                break;
            case "newsDetail":
                this.doCall("viewNewsDetail", {
                    detail_url: e.url
                })
            } else this.doCall("gotoWebview", e)
        },
        gotoNative: function(e) {
            if ("youzanwxd" === _global.platform) if (this.gte(_global.platform_version, "1.5.0")) this.doCall("gotoNative", e);
            else switch (e.page) {
            case "addGoods":
                this.doCall("addGoodsToShop", {
                    alias: e.alias,
                    seller_goods_alias: e.seller_goods_alias
                })
            } else this.doCall("gotoNative", e)
        },
        doAction: function(e) {
            if ("youzanwxd" === _global.platform) if (this.gte(_global.platform_version, "1.5.0")) this.doCall("doAction", e);
            else switch (e.action) {
            case "back":
                this.doCall("gotoLogin", {});
                break;
            case "appWXPay":
                this.doCall("appWXPay", {
                    kdt_id: e.kdt_id,
                    order_no: e.order_no
                });
                break;
            case "deliverGoods":
                this.doCall("deliverGoods", {
                    order_number: e.order_number
                })
            } else if ("youzanwsc" === _global.platform) if (this.gte(_global.platform_version, "2.8.5")) this.doCall("doAction", e);
            else switch (e.action) {
            case "back":
                this.doCall("previousStep", {})
            }
        },
        onAddGoodsSuccess: function(e) {
            window.onReady("YouzanJSBridge",
            function() {
                window.YouzanJSBridge.on("addGoodsSuccess",
                function(o) {
                    e(o)
                })
            })
        },
        on: function(e, o) {
            window.onReady("YouzanJSBridge",
            function() {
                window.YouzanJSBridge.on("dataReady",
                function(t) {
                    var n = t.datatype,
                    a = t.data,
                    i = {};
                    if ("object" == typeof a) i = a;
                    else try {
                        i = JSON.parse(a)
                    } catch(e) {}
                    n === e && o(i)
                })
            })
        }
    }
}),

window.Zepto &&
function(e) {
    e.fn.serializeArray = function() {
        var o, t, n = [],
        a = function(e) {
            if (e.forEach) return e.forEach(a);
            n.push({
                name: o,
                value: e
            })
        };
        return this[0] && e.each(this[0].elements,
        function(n, i) {
            t = i.type,
            o = i.name,
            o && "fieldset" != i.nodeName.toLowerCase() && !i.disabled && "submit" != t && "reset" != t && "button" != t && "file" != t && ("radio" != t && "checkbox" != t || i.checked) && a(e(i).val())
        }),
        n
    },
    e.fn.serialize = function() {
        var e = [];
        return this.serializeArray().forEach(function(o) {
            e.push(encodeURIComponent(o.name) + "=" + encodeURIComponent(o.value))
        }),
        e.join("&")
    },
    e.fn.submit = function(o) {
        if (0 in arguments) this.bind("submit", o);
        else if (this.length) {
            var t = e.Event("submit");
            this.eq(0).trigger(t),
            t.isDefaultPrevented() || this.get(0).submit()
        }
        return this
    }
} (Zepto),
define("vendor/zepto/form",
function() {}),
define("wap/showcase/search_bar/main", ["vendor/zepto/form"],
function() {
    $.fn.searchBar = function() {
        var e = $.fn.searchBar.container;
        return e || (e = $.fn.searchBar.init()),
        this.each(function() {
            $(this).on("click",
            function() {
                e.css("display", "block"),
                e.find(".search-input").focus()
            })
        })
    },
    $.fn.searchBar.keywords = function(e, o) {
        $._ajax({
            url: "/v2/showcase/goods/searchSuggest.json",
            type: "GET",
            dataType: "json",
            timeout: 5e3,
            data: {
                q: e,
                kdt_id: window._global.kdt_id
            },
            success: function(e) {
                var t = e.code,
                n = e.data;
                if (0 === t) {
                    var a = "",
                    i = n.tips,
                    s = i.length;
                    $(".js-tag-clear").addClass("hide"),
                    s > 0 && ($.each(i,
                    function(e, o) {
                        a += "<li><p>" + o + "</p></li>"
                    }), s % 2 && (a += "<li><p>&nbsp;</p></li>"), o.html(a).addClass("search-recom-list"))
                }
            },
            error: function(e, o, t) {}
        })
    },
    $.fn.searchBar.init = function() {
        var e, o = window.localStorage,
        t = $('<div class="search-bar" style="display:none;"></div>'),
        n = $(['<form class="search-form" action="/v2/search" method="GET">', '<input type="search" class="search-input" placeholder="搜索商品" name="q" value="">', '<input type="hidden" name="kdt_id" value="' + window._global.kdt_id + '">', '<a class="js-search-cancel search-cancel" href="javascript:;">取消</a>', '<span class="search-icon"></span>', '<span class="close-icon hide"></span>', "</form>"].join("")),
        a = $('<div class="history-wrap center"></div>'),
        i = n.find(".js-search-cancel"),
        s = $('<ul class="history-list search-recom-list js-history-list clearfix"></ul>'),
        r = $('<a class="tag tag-clear js-tag-clear c-gray-darker hide" href="javascript:;">清除历史搜索</a>'),
        l = n.find(".search-input"),
        c = n.find(".close-icon"),
        d = "";
        return o && (e = (JSON.parse(o.getItem("searchhistory")) || {}).result) && ($.each(e,
        function(e, o) {
            d += "<li>" + o + "</li>"
        }), s.append(d).removeClass("search-recom-list"), r.removeClass("hide")),
        a.append(s).append(r),
        t.append(n).append(a),
        $("body").append(t),
        $.fn.searchBar.container = t,
        n.on("submit",
        function() {
            var t = $.trim(l.val());
            if (t.length > 100) return void motify.log("搜索关键字不能超过100字");
            o && t && (e = e || [], e = $.grep(e,
            function(e) {
                return e != t
            }), e.unshift(t), o.setItem("searchhistory", JSON.stringify({
                result: e
            })))
        }).on("input",
        function() {
            var e = $.trim(l.val());
            "" !== e ? (c.removeClass("hide"), $.fn.searchBar.keywords(e, s)) : (s.html(d).removeClass("search-recom-list"), a.removeClass("hide"), c.addClass("hide"), r.removeClass("hide"))
        }),
        $(".custom-search-input").on("blur",
        function() {
            "" === $(this).val() && $(".input-cover").removeClass("hide")
        }),
        c.on("click",
        function() {
            l.val(""),
            c.addClass("hide")
        }),
        i.on("click",
        function() {
            t.css("display", "none")
        }),
        s.on("click", "li",
        function(e) {
            l.val($(e.currentTarget).text()),
            n.submit()
        }),
        r.on("click",
        function() {
            o && (o.removeItem("searchhistory"), e = null),
            a.html("")
        }),
        t
    }
}),
require(["wap/showcase/base/fuwuhover", "bower_components/imagePreview/views/wx_preview", "bower_components/last_position/main", "vendor/zepto/outer", "wap/showcase/homepage/homepage", "wap/uc/title", "wap/showcase/shop_nav/main", "wap/showcase/search_bar/main"],
function(e, o, t) {
    var n = window._global || {};
    e(),
    n.spm && "h" === n.spm.logType && n.spm.logType2 && window.onReady && window.onReady("Logger",
    function() {
        window.Logger && window.Logger.log({
            spm: n.spm.logType2 + n.spm.logId2,
            fm: "display"
        })
    }),
    $(".js-search").searchBar(),
    "feature" !== n.showcase_type && "homepage" !== n.showcase_type || t({
        needMemoryClass: [".custom-richtext", ".js-goods-list.waterfall", ".js-image-ad-seperated", ".js-ump-activity", ".js-ump-seckill", ".js-showcase-wrapper", ".custom-cube2-table-wrapper", ".custom-nav-4"]
    }),
    o.init()
}),
define("main",
function() {});