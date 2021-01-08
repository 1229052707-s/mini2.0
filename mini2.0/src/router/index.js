import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import login from '../pages/login'
import page1 from '../../src/pages/page1'
// import login from '../pages/login'
import ChangeSecret from '../components/subpage/Left-sub/ChangeSecret'
import Left from '../../src/components/subpage/left'
import page from '../../src/components/subpage/Left-sub/page'
import disk from '../../src/components/subpage/Left-sub/disk'
import disker from '../../src/components/subpage/Left-sub/disker'
import CloudDisk from '../../src/components/subpage/Left-sub/CloudDisk'
import Vpn from '../../src/components/subpage/Left-sub/Vpn'
import Number from '../../src/components/subpage/Left-sub/number'
import register from '../../src/components/subpage/Left-sub/register'
import journal from '../components/subpage/Left-sub/journal'
import course from '../components/subpage/Left-sub/course'
import zhuce from '../components/course/zhuce'
import jiaocheng from '../components/course/jiaocheng'
import down from '../components/course/down'
import newlyBuild from '../components/course/newlyBuild'
import connect from '../components/course/connect'
import shutDown from '../components/course/shutDown'
import usageRules from '../components/course/usageRules'
import note from '../components/course/note'
import agreement from '../components/course/agreement'
import synopsis from '../components/subpage/Left-sub/synopsis'
import system from '../../src/components/subpage/Left-sub/system'
import license from '../../src/components/license/license'
import acousticImage from '../../src/components/subpage/Left-sub/acousticImage'

Vue.use(Router)
export default new Router({
    mode: "history",

    routes: [{
            path: '*',
            name: 'login',
            component: login
        },
        {
            path: '/Left',
            name: 'Left',
            component: Left,
            register: 'page',
            children: [{
                    path: '/page',
                    name: 'page',
                    component: page
                },
                {
                    path: '/disk',
                    name: 'disk',
                    component: disk
                }, {
                    path: '/disker',
                    name: 'disker',
                    component: disker
                }, {
                    path: '/CloudDisk',
                    name: 'CloudDisk',
                    component: CloudDisk
                },
                {
                    path: '/Vpn',
                    name: 'Vpn',
                    component: Vpn
                },
                {
                    path: '/Number',
                    name: 'Number',
                    component: Number
                },
                {
                    path: '/register',
                    name: 'register',
                    component: register
                },
                {
                    path: '/system',
                    name: 'system',
                    component: system,

                },
                {
                    path: '/license',
                    name: 'license',
                    component: license
                },
                {
                    path: '/acousticImage',
                    name: 'acousticImage',
                    component: acousticImage
                },
                {
                    path: '/journal',
                    name: 'journal',
                    component: journal
                },
                {
                    path: '/ChangeSecret',
                    name: 'ChangeSecret',
                    component: ChangeSecret
                },
                {
                    path: '/course',
                    name: 'course',
                    component: course,
                    redirect: '/zhuce',
                    children: [{
                            path: '/zhuce',
                            name: zhuce,
                            component: zhuce
                        }, {
                            path: '/jiaocheng',
                            name: ' jiaocheng',
                            component: jiaocheng
                        },
                        {
                            path: '/down',
                            name: 'down',
                            component: down
                        },
                        {
                            path: '/newlyBuild',
                            name: 'newlyBuild',
                            component: newlyBuild
                        },
                        {
                            path: '/connect',
                            name: ' connect',
                            component: connect
                        },
                        {
                            path: '/shutDown',
                            name: 'shutDown',
                            component: shutDown
                        },
                        {
                            path: "/usageRules",
                            name: 'usageRules',
                            component: usageRules
                        },
                        {
                            path: "/agreement",
                            name: 'agreement',
                            component: agreement
                        },
                        {
                            path: '/note',
                            name: 'note',
                            component: note
                        }
                    ]
                },
                {
                    path: '/synopsis',
                    name: 'synopsis',
                    component: synopsis
                }
            ],
            redirect: '/page'

        }


    ],



});
// router.beforeEach((to, from, next) => {
//     let token = sessionStorage.getItem('token')
//     if (to.path = '/login') {
//         next()
//     } else {
//         if (token == '' || token == null) {
//             next('/login')
//         } else {
//             next()
//         }
//     }
// });
// export default router;