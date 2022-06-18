const notes_list=[
    {
        id:1,
        userName: "aditya_1",
        notes:[
        {
            title:"first note",
            subtasks:[{
                sub:"first note sub1",
                deadline:new Date(2018,5,4,10)
            },
            {
                sub:"first note sub2",
                deadline:new Date(2017,5,4,10)
            }
            ]
        },
        {
            title:"second note",
            subtasks:[{
                sub:"second note sub1",
                deadline:new Date(2020,5,4,10)
            },
            {
                sub:"second note sub2",
                deadline:new Date(2023,5,4,10)
            },
            {
                sub:"second note sub3",
                deadline:new Date(2021,6,4,10)
            }
            ]
        },

        {
            title:"third note",
            subtasks:[{
                sub:"third note sub1",
                deadline:new Date(2020,4,4,10)
            },
            {
                sub:"third note sub2",
                deadline:new Date(2021,4,4,10)
            }
            ]
        },
        {
            title:"fourth note",
            subtasks:[{
                sub:"fourth note sub1",
                deadline:new Date(2018,5,5,10)
            },
            {
                sub:"fourth note sub2",
                deadline:new Date(2017,5,5,10)
            }
            ]
        },
        {
            title:"fifth note",
            subtasks:[{
                sub:"fifth note sub1",
                deadline:new Date(2020,5,4,1)
            },
            {
                sub:"fifth note sub2",
                deadline:new Date(2017,5,4,1)
            }
            ]
        }
        ]        
    }
];
export default notes_list;