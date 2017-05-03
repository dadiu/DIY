#道具环助手


### 参考
- [微信小程序入门与实战](http://coding.imooc.com/learn/list/75.html)
- [Muse-UI](http://www.muse-ui.org)


### 反馈记录
+ 道具
    - 增加66、2级宝石、1级宝石

                    { t : '金柳露', p : 1000, n : 0 },
                    { t : '2级宝石', p : 1600, n : 0 },
                    { t : '1级宝石', p : 600, n : 0 }
    - 增加价格自定义
    - 价格能自定义(长按)
+ 角色
    - 能修改大区、角色和等级(长按)
    - 增加大区、角色、等级功能(单击) - 延后3
    - 切换角色(双击) - 延后3
+ GM
    - 增加GM赠送3个书铁
    - 增加反馈文本
    
    

### 项目结构

    |- 首次进入
        |- 创建角色
    |- 二次进入
        |- 历史 <--------------
            |- 列表           |
            |- 详情           |
        |- 新增               |
            |- 创建           |
            |- 编辑           |
                |- GM奖励 -----

### 本地储存涉及数据

- role-info     当前角色

                {
                    role : String,
                    area : String,
                    level : Number
                }

- pro-info      当前道具

                {
                    time : string,
                    week : String,
                    total : Number,
                    list : [
                        {  
                            t : String,
                            p : Number,
                            n : Number
                        }
                    ]
                }

- history-list  历史记录列表

                [
                    {
                        time : String,
                        week : String,
                        level : Number,
                        total : Number,
                        id : Number
                    }
                ]

- history-info  历史记录详情

                {
                    id : {
                        time : String,
                        week : String,
                        total : Number,
                        list : [
                            {  
                                t : String,
                                p : Number,
                                n : Number
                            }
                        ]
                    }
                }


### 记录
- 20170427 - 一期仅支持单角色记录（角色列表页面为role,考虑到页面层级问题，延至二期）
- 20170417 - 创建