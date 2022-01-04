using System;
using System.Collections.Generic;
using MySql.Data.MySqlClient;
using Dapper;

namespace DevTeam.Framework
{
    [Serializable]
    public abstract class EntityBase<T>
    {


        [System.ComponentModel.DataAnnotations.Schema.Column("Id")]
        [System.ComponentModel.DataAnnotations.Key]
        public int Id { get; set; }

        //public DateTime InsertDate { get; set; }

        //[Dapper.NotMapped]
        //public int InsertUserId { get; set; }

        //public DateTime UpdateDate { get; set; }

        //public int UpdateUserId { get; set; }

        public T Get<T>(int id)
        {
            using (var connection = new MySqlConnection("Server=localhost;UserID=root;Password=;Database=diamonddb;Port=3306;SslMode=None;"))
            {

                connection.Open();
                return connection.Get<T>(id);


                //var invoiceList = connection.GetList<UserDefinition>();

                //var webInvoices = connection.GetList<UserDefinition>(new { Kind = InvoiceKind.WebInvoice });

                //var listPaged = connection.GetListPaged<UserDefinition>(1, 10, "where Code like '%Invoice%'", "Code desc");

                //var invoiceId = connection.Insert(new UserDefinition { Kind = InvoiceKind.WebInvoice, Code = "Insert_Single_1" });

                //invoice.Code = "Update_Invoice";
                //invoice.Kind = InvoiceKind.StoreInvoice;

                //var id = connection.Update(invoice);

                //invoice = connection.Get<UserDefinition>(invoiceId);

                //var status = connection.Delete(invoice);

                //var count = connection.RecordCount<Invoice>("where Code like '%Invoice%'");
                //string query = "SELECT * FROM USER_DEFINITION where ID = @userId ORDER BY Id";
                //userDefinition = connection.QueryFirst<UserDefinition>(query, new { userId });
            }
        }

        public IEnumerable<T> GetList<T>(object value)
        {
            using (var connection = new MySqlConnection("Server=localhost;UserID=root;Password=;Database=diamonddb;Port=3306;SslMode=None;"))
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

                using (var connection = new MySqlConnection("Server=localhost;UserID=root;Password=;Database=diamonddb;Port=3306;SslMode=None;"))
                {
                    connection.Open();

                    returnObject.Value = connection.Insert(entity);

                    //var invoiceList = connection.GetList<UserDefinition>();

                    //var webInvoices = connection.GetList<UserDefinition>(new { Kind = InvoiceKind.WebInvoice });

                    //var listPaged = connection.GetListPaged<UserDefinition>(1, 10, "where Code like '%Invoice%'", "Code desc");

                    //var invoiceId = connection.Insert(new UserDefinition { Kind = InvoiceKind.WebInvoice, Code = "Insert_Single_1" });

                    //invoice.Code = "Update_Invoice";
                    //invoice.Kind = InvoiceKind.StoreInvoice;

                    //var id = connection.Update(invoice);

                    //invoice = connection.Get<UserDefinition>(invoiceId);

                    //var status = connection.Delete(invoice);

                    //var count = connection.RecordCount<Invoice>("where Code like '%Invoice%'");
                    //string query = "SELECT * FROM USER_DEFINITION where ID = @userId ORDER BY Id";
                    //userDefinition = connection.QueryFirst<UserDefinition>(query, new { userId });
                }
                return returnObject;
            }
            catch (MySqlException excp)
            {
                returnObject.Results.Add(new Result("", excp.Message));
                return returnObject;
            }
        }


        //private int? Save(EntityBase entity)
        //{
        //    using (var connection = new MySqlConnection("Server=localhost;UserID=root;Password=;Database=diamonddb;Port=3306;SslMode=None;"))
        //    {

        //        connection.Open();

        //        return connection.Insert(entity);

        //        //var invoiceList = connection.GetList<UserDefinition>();

        //        //var webInvoices = connection.GetList<UserDefinition>(new { Kind = InvoiceKind.WebInvoice });

        //        //var listPaged = connection.GetListPaged<UserDefinition>(1, 10, "where Code like '%Invoice%'", "Code desc");

        //        //var invoiceId = connection.Insert(new UserDefinition { Kind = InvoiceKind.WebInvoice, Code = "Insert_Single_1" });

        //        //invoice.Code = "Update_Invoice";
        //        //invoice.Kind = InvoiceKind.StoreInvoice;

        //        //var id = connection.Update(invoice);

        //        //invoice = connection.Get<UserDefinition>(invoiceId);

        //        //var status = connection.Delete(invoice);

        //        //var count = connection.RecordCount<Invoice>("where Code like '%Invoice%'");
        //        //string query = "SELECT * FROM USER_DEFINITION where ID = @userId ORDER BY Id";
        //        //userDefinition = connection.QueryFirst<UserDefinition>(query, new { userId });
        //    }
        //    return 1;
        //}

        public int Update(T entity)
        {
            using (var connection = new MySqlConnection("Server=localhost;UserID=root;Password=;Database=diamonddb;Port=3306;SslMode=None;"))
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
