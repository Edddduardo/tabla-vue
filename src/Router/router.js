import Vue    from 'vue'
import Router from 'vue-router'
import hw    from '@/components/HelloWorld'
import table   from '@/components/table'
import edit   from '@/components/edit'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            
            component: hw
        },
        {
            path: '/table',
            name: 'table',
            component: table
        },
        {
            path: '/edit',
            name: 'edit',
            component: edit
        }
    ],
    linkActiveClass: "active",
    mode: "history"
})