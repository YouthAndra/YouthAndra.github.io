const path = require("path");
const wrap = require("./wrap");
const isProd = process.env.NODE_ENV === "production";

const config = {
    theme: "default",
    dev: {
        port: 3000,
        outputPath: path.join(process.cwd(), "./"),
        publicPath: isProd ? "https://youthandra.github.io/" : "/"
    },
    website: {
        pageName(page){
            return page.replace('.html', '')
        },
        seo: {
            title: "Sirius Home Page",
            keywords: "sirius, 张佳, 张光佳, 代码, 扯淡, 音乐, 电影, 分享",
            description: "Hi, 暂时还没想到要描叙什么...<br/>QQ：361244845",
            copyright: '© 2018 All Rights Reserved.  阿里云 提供 CDN 服务. 托管于 <a href="https://github.com/YouthAndra/YouthAndra.github.io">GitHub</a>.'
        },
        post: {
            excerpt: 120,
            pageSize: 5
        },
        github: {
            clientID: "645d8513c8e9a0f1a3b1",
            clientSecret: "750df2efe31dd57205617eee57cbd198afd1368c",
            repo: "youthandra.github.io",
            owner: "YouthAndra",
            admin: ["YouthAndra"]
        },
        plugins: {
            loading: "#000",
            baidutongji: "b511b88502a6caf5710423cdf2203692"
        },
        menus: [
            {
                name: "首页",
                link: "/"
            },
            {
                name: "关于",
                link: "/about.html"
            },
            {
                name: "归档",
                link: "/archive.html"
            },
            {
                name: "留言",
                link: "/message.html"
            },
            {
                name: "友链",
                link: "/friends.html"
            }
        ]
    }
};

module.exports = wrap(config);