/// 阅读 api.d.ts 查看文档
///<reference path="api.d.ts"/>

import * as path from 'path';
import { UglifyPlugin, CompilePlugin, ManifestPlugin, ExmlPlugin, EmitResConfigFilePlugin, TextureMergerPlugin, CleanPlugin, ResSplitPlugin } from 'built-in';
import { SubPackagePlugin } from './wxgame/subpackage'
import { WxgamePlugin } from './wxgame/wxgame';
import { CustomPlugin } from './myplugin';
import * as defaultConfig from './config';

//是否使用微信分离插件
const useWxPlugin: boolean = false;
const config: ResourceManagerConfig = {

    buildConfig: (params) => {

        const { target, command, projectName, version } = params;
        const outputDir = `../${projectName}_wxgame`;
        if (command == 'build') {
            return {
                outputDir,
                commands: [
                    new CleanPlugin({ matchers: ["js", "resource", "egret-library", 'stage1'] }),
                    new CompilePlugin({ libraryType: "debug", defines: { DEBUG: true, RELEASE: false } }),
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                    new WxgamePlugin(useWxPlugin),
                    new UglifyPlugin([
                        {
                            sources: ["libs/modules/egret/egret.js"],
                            target: "egret.min.js"
                        },
                        {
                            sources: ['libs/modules/eui/eui.js'],
                            target: "eui.min.js"
                        },
                        {
                            sources: ['libs/modules/assetsmanager/assetsmanager.js'],
                            target: "assetsmanager.min.js"
                        },
                        {
                            sources: ['libs/modules/dragonBones/dragonBones.js'],
                            target: "dragonBones.min.js"
                        },
                        {
                            sources: ['libs/modules/game/game.js'],
                            target: "game.min.js"
                        },
                        {
                            sources: ['libs/modules/tween/tween.js'],
                            target: "tween.min.js"
                        },
                        {
                            sources: ['libs/modules/socket/socket.js'],
                            target: "socket.min.js"
                        },
                        {
                            sources: ["main.js"],
                            target: "main.min.js"
                        }
                    ]),
                    new ResSplitPlugin({
                        matchers: [
                            { from: "resource/**", to: `../${projectName}_wxgame_remote` }
                        ]
                    }),
                    // new ManifestPlugin({ output: 'manifest.js' })
                    new SubPackagePlugin({
                        // output为主包加载的资源manifest.js
                        output: 'manifest.js',
                        subPackages: [
                            {
                                root: "stage1",
                                "includes": [
                                    "main.js"
                                ]
                            }
                        ],
                        // verbose为true则开启文件路径输出调试
                        verbose: true
                    })
                ]
            }
        }
        else if (command == 'publish') {
            return {
                outputDir,
                commands: [
                    new CleanPlugin({ matchers: ["js", "resource", "egret-library", 'stage1'] }),
                    new CompilePlugin({ libraryType: "release", defines: { DEBUG: false, RELEASE: true } }),
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                    new WxgamePlugin(useWxPlugin),
                    new UglifyPlugin([
                        // 使用 EUI 项目，要压缩皮肤文件，可以开启这个压缩配置
                        // {
                        //     sources: ["resource/default.thm.js"],
                        //     target: "default.thm.min.js"
                        // },
                        {
                            sources: ["main.js"],
                            target: "main.min.js"
                        }
                    ]),
                    new ResSplitPlugin({
                        matchers: [
                            { from: "resource/**", to: `../${projectName}_wxgame_remote` }
                        ]
                    }),
                    // new ManifestPlugin({ output: 'manifest.js', useWxPlugin: useWxPlugin })
                    new SubPackagePlugin({
                        output: 'manifest.js',
                        subPackages: [
                            {
                                root: "stage1",
                                "includes": [
                                    "main.js"
                                ]
                            }
                        ],
                    })
                ]
            }
        }
        else {
            throw `unknown command : ${params.command}`;
        }
    },

    mergeSelector: defaultConfig.mergeSelector,

    typeSelector: defaultConfig.typeSelector
}



export = config;
