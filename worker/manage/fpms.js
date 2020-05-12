/*
 * @Descripttion: 
 * @version: 
 * @Author: xdh.ss
 * @Date: 2020-04-01 14:50:55
 * @LastEditors: xdh.ss
 * @LastEditTime: 2020-04-03 14:25:37
 */
import {get} from 'lodash';
import postal from 'postal';
import {
    get_data_schedule_body_DB,
    get_flight_schedule_data,
    get_process_schedule_data_by_fiter,
    flight_schedule_header_data_is_update,
    process_schedule_header_data_is_update,
    flight_schedule_body_data_is_update,
    get_data_schedule_header_DB,
    get_flight_schedule_body_data

} from '../database/fpms';
import {init as fpmsinit,setStep2} from '../channel/fpms';


postal.subscribe({
    channel: 'worker.fpms',
    topic: 'get_flight_schedule_data',
    callback: async data => {
        const flight_schedule_data = await get_flight_schedule_data();
        postal.publish({
            channel: 'web.fpms',
            topic: 'flight_schedule_data_is_update',
            data: flight_schedule_data
        })
    }
})

postal.subscribe({
    channel: 'worker.fpms',
    topic: 'flight_schedule_header_data_is_update',
    callback: async data => {
        await flight_schedule_header_data_is_update(data);
        const datas = await get_data_schedule_body_DB();
        postal.publish({
            channel: 'web.fpms',
            topic: 'flight_schedule_data_is_update',
            data: datas
        })
    }   
})


postal.subscribe({
    channel: 'worker.fpms',
    topic: 'process_schedule_header_data_is_update',
    callback: async data => {
        await process_schedule_header_data_is_update(data);
        const datas = await get_data_schedule_body_DB();
        postal.publish({
            channel: 'web.fpms',
            topic: 'flight_schedule_data_is_update',
            data: datas
        })
    }
})

postal.subscribe({
    channel: 'worker.fpms',
    topic: 'flight_schedule_body_data_is_update',
    callback: async data => {
        await flight_schedule_body_data_is_update(data);
        const datas = await get_data_schedule_body_DB();
        postal.publish({
            channel: 'web.fpms',
            topic: 'flight_schedule_data_is_update',
            data: datas
        })
    }
})


postal.subscribe({
    channel: 'worker.fpms',
    topic: 'get_flight_schedule_data_by_server',
    callback:data => {
        fpmsinit(data)
    }
})

postal.subscribe({
    channel: 'worker.fpms',
    topic: 'get_flight_schedule_data_by_db',
    callback: async data => {
        const header = await get_data_schedule_header_DB();
        const body = await get_data_schedule_body_DB();
        if(body.flight_body.length==0||header.flight_header.length==0){//无数据,从server获取数据
            postal.publish({
                channel:'worker.fpms',
                topic:'get_flight_schedule_data_by_server',
                data:{
                    token:data.token
                }
            })
            return false
        }
        
        postal.publish({
            channel: 'web.fpms',
            topic: 'flight_schedule_data_header',
            data: header
        });
        postal.publish({
            channel: 'web.fpms',
            topic: 'flight_schedule_data_body',
            data: body
        });
    }
})

postal.subscribe({
    channel: 'worker.fpms',
    topic: 'get_process_schedule_data_by_fiter',
    callback:data => {
        // const flight_schedule_data = await get_process_schedule_data_by_fiter(data);
        get_process_schedule_data_by_fiter(data)
        // fpmsinit(data)
    }
})