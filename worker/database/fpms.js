/*
 * @Descripttion: 数据库操作
 * @version: 
 * @Author: xdh.ss
 * @Date: 2020-04-02 10:55:04
 * @LastEditors: xdh.ss
 * @LastEditTime: 2020-04-03 14:51:56
 */
import loki from 'lokijs';
import Promise from 'bluebird';
import {omit, get, extend} from 'lodash';
import { promises } from 'fs';

const DB = new loki('fpms.db', { adapter: 'memory' });


const flight_schedule_header_DB = DB.addCollection('flight_schedule_header', {
    unique: ['id','flightId']
});
const flight_schedule_body_DB = DB.addCollection('flight_schedule_body', {
    unique: ['id','flightId']
});


const process_schedule_monitorShow_DB = DB.addCollection('process_schedule', {
    unique: ['id','flightId']
});
const process_schedule_header_DB = DB.addCollection('process_header_schedule', {
    unique: ['id','flightId']
});
const process_schedule_body_DB = DB.addCollection('process_body_schedule', {
    unique: ['id','flightId']
});
// 创建登录用户DB
const online_users_DB = DB.addCollection('online_users', {
    unique: ['userId']
});









flight_schedule_header_DB.ensureUniqueIndex('id');
flight_schedule_body_DB.ensureUniqueIndex('id');


process_schedule_monitorShow_DB.ensureUniqueIndex('id');
process_schedule_header_DB.ensureUniqueIndex('id');



export const save_data_schedule_header_DB = datas => {//保存header所有数据
    let data = {
        flight_header:datas.flight,
        process_header:datas.process,
        process_monitorShow:{monitorShow:datas.monitorShow}
    }
    
    Promise.all([
        save_to_flight_schedule_header_DB(data.flight_header),
        save_to_process_schedule_header_DB(data.process_header),
        save_to_process_schedule_monitorShow_DB(data.process_monitorShow),
    ]).then(res=>{
        
    })

}
export const save_data_schedule_body_DB = data => {//保存body所有数据
    let flight = data.flight || {}
    let process = data.process || {}

    // flight.forEach(list => {
    //     list.processData = process[list.flightId]||[]
    // });

    Promise.all([
        save_to_flight_schedule_body_DB(flight),
        save_to_process_schedule_body_DB(process)
    ]).then(res=>{
        
    })

}

export const get_data_schedule_header_DB = query => {//获取header所有数据
    return new Promise((resolve, reject) => {
        Promise.props({
            flight_header:get_flight_schedule_header_data(),
            process_header:get_process_schedule_header_data(),
            process_monitorShow:get_process_schedule_monitorShow_data()
        }).then(res=>{
            var data = {
                flight_header:res.flight_header,
                process_header:res.process_header,
                monitorShow:res.process_monitorShow[0]
            }
            if (data) {
                resolve(data);
            } else {
                reject(null);
            }
        })
    })
}

export const get_data_schedule_body_DB = query => {//获取body所有数据
    return new Promise((resolve, reject) => {
        Promise.props({
            flight_body:get_flight_schedule_body_data(),
            process_body:get_process_schedule_body_data(),
        }).then(res=>{
            var data = {
                flight_body:res.flight_body,
                process_body:res.process_body
            }
            if (data) {
                resolve(data);
            } else {
                reject(null);
            }
        })
    })
}



//fightheader

export const save_to_flight_schedule_header_DB = data => {//保存航班body信息
    return new Promise((resolve, reject) => {
        if (data) {
            flight_schedule_header_DB.insert(data);
            resolve(data);
        } else {
            reject(null);
        }

    })
}

export const get_flight_schedule_header_data = query => {//单独获取flightbody数据
    return new Promise((resolve, reject) => {
        let data = flight_schedule_header_DB.chain().find().data();
        if (data) {
            resolve(data);
        } else {
            reject(null);
        }
    })
}

export const flight_schedule_header_data_is_update = data => {//filghtheader 更新
    
    return new Promise((resolve, reject) => {
        if (data) {
            flight_schedule_header_DB.update(data)
            resolve(data);
        } else {
            reject(null);
        }
    })
}

export const flight_schedule_header_data_is_del = data => {//filghtheader 删除
    return new Promise((resolve, reject) => {
        if (data) {
            flight_schedule_header_DB.remove(data)
            resolve(data);
        } else {
            reject(null);
        }
    })
}

//fight_body

export const save_to_flight_schedule_body_DB = data => {//保存filghtbody信息
    return new Promise((resolve, reject) => {
        if (data) {
            flight_schedule_body_DB.insert(data);
            resolve(data);
        } else {
            reject(null);
        }

    })
}

export const get_flight_schedule_body_data = query => {//获取flightbody数据
    return new Promise((resolve, reject) => {
        let data = flight_schedule_body_DB.chain().find().data();
        if (data) {
            resolve(data);
        } else {
            reject(null);
        }
    })
}

export const flight_schedule_body_data_is_update = (data,type) => {//filghtbody 更新

    let item = omit(data, ['$loki', 'mate']);
    let exist_flight_schedule = flight_schedule_body_DB.by('flightId', item.flightId);
    return new Promise((resolve, reject) => {
        if (data) {
            if (!exist_flight_schedule) {
                flight_schedule_body_DB.insert(item);
            } else {
                // item.flightStatus = "22222"
                // item.flightNo = "1111111"
                flight_schedule_body_DB.update(_.extend(exist_flight_schedule, item))
            }
            resolve(data);
        } else {
            reject(null);
        }
    })
}

export const get_flight_schedule_body_item = data => {//获取单个item信息
    let item = omit(data, ['$loki', 'mate']);
    let result = flight_schedule_body_DB.by('flightId',item.flightId)
    return new Promise((resolve, reject) => {
        if (data) {
            resolve(result);
        } else {
            reject(null);
        }
    })
}

export const flight_schedule_body_data_is_del = (data,type) => {//filghtbody 删除

    let item = omit(data, ['$loki', 'mate']);
    let exist_flight_schedule = flight_schedule_body_DB.by('flightId',item.flightId);
    return new Promise((resolve, reject) => {
        if (data) {
            flight_schedule_body_DB.remove(exist_flight_schedule)
            resolve(data);
        } else {
            reject(null);
        }
    })
}


//process_monitorShow

export const save_to_process_schedule_monitorShow_DB = data => {//保存进程信息
    return new Promise((resolve, reject) => {
        if (data) {
            process_schedule_monitorShow_DB.insert(data);
            resolve(data);
        } else {
            reject(null);
        }
    })
}


export const get_process_schedule_monitorShow_data = query => {//单独获取进程数据
    return new Promise((resolve, reject) => {
        let data = process_schedule_monitorShow_DB.chain().find().data();
        if (data) {
            resolve(data);
        } else {
            reject(null);
        }
    })
}

//process_header

export const save_to_process_schedule_header_DB = data => {//保存航班body信息
    return new Promise((resolve, reject) => {
        if (data) {
            process_schedule_header_DB.insert(data);
            resolve(data);
        } else {
            reject(null);
        }

    })
}

export const get_process_schedule_header_data = query => {//单独获取flightbody数据
    return new Promise((resolve, reject) => {
        let data = process_schedule_header_DB.chain().find().data();
        if (data) {
            resolve(data);
        } else {
            reject(null);
        }
    })
}

export const process_schedule_header_data_is_update = data => {//filghtheader 更新
    
    return new Promise((resolve, reject) => {
        if (data) {
            process_schedule_header_DB.update(data)
            resolve(data);
        } else {
            reject(null);
        }
    })
}

export const process_schedule_header_data_is_del = data => {//filghtheader 删除
    return new Promise((resolve, reject) => {
        if (data) {
            process_schedule_header_DB.remove(data)
            resolve(data);
        } else {
            reject(null);
        }
    })
}




//process_body

export const save_to_process_schedule_body_DB = data => {//保存processbody信息
    return new Promise((resolve, reject) => {
        if (data) {
            process_schedule_body_DB.insert(data);
            resolve(data);
        } else {
            reject(null);
        }

    })
}

export const get_process_schedule_body_data = query => {//获取processbody数据
    return new Promise((resolve, reject) => {
        let data = process_schedule_body_DB.chain().find().data();
        if (data) {
            resolve(data);
        } else {
            reject(null);
        }
    })
}



// export const process_schedule_body_data_is_update = (data,type) => {//filghtbody 更新

//     let item = omit(data, ['$loki', 'mate']);
//     let exist_flight_schedule = process_schedule_body_DB.by('flightId', item.flightId);
//     return new Promise((resolve, reject) => {
//         if (data) {
//             if (!exist_flight_schedule) {
//                 process_schedule_body_DB.insert(item);
//             } else {
//                 // item.flightStatus = "22222"
//                 // item.flightNo = "1111111"
//                 process_schedule_body_DB.update(_.extend(exist_flight_schedule, item))
//             }
//             resolve(data);
//         } else {
//             reject(null);
//         }
//     })
// }

// export const get_process_schedule_body_item = data => {//获取单个item信息
//     let item = omit(data, ['$loki', 'mate']);
//     let result = process_schedule_body_DB.by('flightId',item.flightId)
//     return new Promise((resolve, reject) => {
//         if (data) {
//             resolve(result);
//         } else {
//             reject(null);
//         }
//     })
// }

// export const process_schedule_body_data_is_del = (data,type) => {//filghtbody 删除

//     let item = omit(data, ['$loki', 'mate']);
//     let exist_flight_schedule = process_schedule_body_DB.by('flightId',item.flightId);
//     return new Promise((resolve, reject) => {
//         if (data) {
//             process_schedule_body_DB.remove(exist_flight_schedule)
//             resolve(data);
//         } else {
//             reject(null);
//         }
//     })
// }





// 保存-在线用户数据
export const save_online_users_data = data => {
    return new Promise((resolve, reject) => {
        if (data) {
            online_users_DB.insert(data);
            resolve(data);
        } else {
            reject(null);
        }

    })
}
// 获取-在线用户数据
export const get_online_users_data = query => {
    return new Promise((resolve, reject) => {
        let data = online_users_DB.chain().find().data();
        if (data) {
            resolve(data);
        } else {
            reject(null);
        }
    })
}
// 更新-在线用户数据
export const update_online_users_data = data => {
    
    return new Promise((resolve, reject) => {
        if (data) {
            online_users_DB.update(data)
            resolve(data);
        } else {
            reject(null);
        }
    })
}
// 删除-在线用户数据
export const delete_online_users_data = data => {
    return new Promise((resolve, reject) => {
        if (data) {
            online_users_DB.remove(data)
            resolve(data);
        } else {
            reject(null);
        }
    })
}














































































































