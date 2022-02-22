using System;
using System.Collections.Generic;
using Microsoft.Data.Sqlite;

using Dapper;

namespace DevTeam.Framework
{
    [Serializable]
    public abstract class EntityBaseSQLlite<T>
    {
       
        private static readonly string _connectionString="Data Source=/Users/mehmeti/Desktop/git component/Upwork/WebHealthChecker/Backend/DevTeam.Framework/webcheckerDb.db";
        [System.ComponentModel.DataAnnotations.Schema.Column("Id")]
        [System.ComponentModel.DataAnnotations.Key]
        public int Id { get; set; }

      [System.ComponentModel.DataAnnotations.Schema.Column("InsertDate")]
        [System.ComponentModel.DataAnnotations.Key]
        public DateTime InsertDate { get; set; }

 
        public T Get<T>(int id)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {

                connection.Open();
                return connection.Get<T>(id);


            }
        }

        public IEnumerable<T> GetList<T>(object value)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {

                connection.Open();
                return connection.GetList<T>(value);

            }
        }
        public IEnumerable<T> GetListConditions<T>(string querypart,object value)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {

                connection.Open();
                return connection.GetList<T>(querypart,value);

            }
        }

        public GenericResponse<int?> Save(T entity)
        {
            GenericResponse<int?> returnObject = new GenericResponse<int?>();
            try
            {

                using (var connection = new SqliteConnection(_connectionString))
                {
                    connection.Open();

                    returnObject.Value = connection.Insert(entity);

             
                }
                return returnObject;
            }
            catch (Exception excp)
            {
                returnObject.Results.Add(new Result("", excp.Message));
                return returnObject;
            }
        }


        public GenericResponse<int?> UpdateGeneric(T entity)
        {
            GenericResponse<int?> returnObject = new GenericResponse<int?>();
            try
            {

                using (var connection = new SqliteConnection(_connectionString))
                {
                    connection.Open();

                    returnObject.Value = connection.Update(entity);
                }
                return returnObject;
            }
            catch (Exception excp)
            {
                returnObject.Results.Add(new Result("", excp.Message));
                return returnObject;
            }
        }

        public int Update(T entity)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();

                return connection.Update(entity);
            }
            return 1;

        }

        public int Delete<T>(int id)
        {
               using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();

                return connection.Delete<T>(id);
            }
           
            return 1;

        }


             public int DeleteByConditions<T>(string querypart,object value)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {

                connection.Open();
                return connection.DeleteList<T>(querypart,value);

            }
        }
    }
}
