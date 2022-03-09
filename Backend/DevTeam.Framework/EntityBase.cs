using System;
using System.Collections.Generic;
using MySql.Data.MySqlClient;
using Dapper;

namespace DevTeam.Framework
{
    [Serializable]
    public abstract class EntityBase<T>
    {
        private static readonly string _connectionString="Server=localhost;UserID=root;Password=;Database=diamonddb;Port=3306;SslMode=None;";
        [System.ComponentModel.DataAnnotations.Schema.Column("Id")]
        [System.ComponentModel.DataAnnotations.Key]
        public int Id { get; set; }

      [System.ComponentModel.DataAnnotations.Schema.Column("InsertDate")]
        [System.ComponentModel.DataAnnotations.Key]
        public DateTime InsertDate { get; set; }

 
        public T Get<T>(int id)
        {
            using (var connection = new MySqlConnection(_connectionString))
            {

                connection.Open();
                return connection.Get<T>(id);


            }
        }

        public IEnumerable<T> GetList<T>(object value)
        {
            using (var connection = new MySqlConnection(_connectionString))
            {

                connection.Open();
                return connection.GetList<T>(value);

            }
        }


        public GenericResponse<int?> Save(T entity)
        {
            GenericResponse<int?> returnObject = new GenericResponse<int?>();
            try
            {

                using (var connection = new MySqlConnection(_connectionString))
                {
                    connection.Open();

                    returnObject.Value = connection.Insert(entity);

             
                }
                return returnObject;
            }
            catch (MySqlException excp)
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

                using (var connection = new MySqlConnection(_connectionString))
                {
                    connection.Open();

                    returnObject.Value = connection.Update(entity);
                }
                return returnObject;
            }
            catch (MySqlException excp)
            {
                returnObject.Results.Add(new Result("", excp.Message));
                return returnObject;
            }
        }

        public int Update(T entity)
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                connection.Open();

                return connection.Update(entity);
            }
            return 1;

        }

        public int Delete(int id)
        {
            return 1;

        }
    }
}
