import { createLogger, transports as _transports, format as _format } from 'winston';
import { join } from 'path';

const errorLogger = createLogger({
    transports: [
        
        new _transports.File({ filename: join('./','error.log') })
    ]
    ,
    format: _format.combine(
        _format.timestamp(),
        _format.json()
    )
    ,
    level: 'error'

})
const accessLogger = createLogger({
    transports: [
        new _transports.File({ filename: join('./','access.log') })
    ]
    ,
    format: _format.combine(
        _format.timestamp(),
        _format.json()
    )
    ,
    level: 'info'

})

export {
    errorLogger,
    accessLogger
}
