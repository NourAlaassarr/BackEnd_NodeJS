import { Sequelize } from "sequelize";
export const SeqInstance = new Sequelize ('assignment_5','root','',{
    host:'localhost',
    dialect:'mysql',
})

export const DBconnection = async ()=>
{
    return await SeqInstance
    .sync({alter:false,})
    .then((res) => console.log('Connection has been established successfully.'))
    .catch((error)=>console.error('Unable to connect to the database:', error))
}
