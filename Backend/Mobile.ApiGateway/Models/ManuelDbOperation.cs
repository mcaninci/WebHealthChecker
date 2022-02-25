using System;
using System.Collections.Generic;
using Microsoft.Data.Sqlite;

using Dapper;
using Mobile.ApiGateway.Models.Entities;
using DevTeam.Framework;

namespace Mobile.ApiGateway
{
    [Serializable]
    public class ManuelDbOperation
    {

        private static readonly string _connectionString = "Data Source=/Users/mehmeti/Desktop/git component/Upwork/WebHealthChecker/Backend/DevTeam.Framework/webcheckerDb.db";
        public static GenericResponse<int?> InsertUserDefinition(UserDefinition userDefinitionModel)
        {
            GenericResponse<int?> returnObject = new GenericResponse<int?>();
            try
            {

                using (var connection = new SqliteConnection(_connectionString))
                {
                    connection.Open();

                    string insertUserSql = @"INSERT INTO User_Definition(InsertDate, HashCode, Token)
                        VALUES(@InsertDate, @HashCode, @Token);SELECT rowid FROM user_definition order by 1 desc limit 1;";

                    int newUserId = connection.QuerySingle<int>(
                                        insertUserSql,
                                        new
                                        {
                                            InsertDate = userDefinitionModel.InsertDate,
                                            HashCode = userDefinitionModel.HashCode,
                                            Token = userDefinitionModel.Token
                                        }
                                        );

                    returnObject.Value = newUserId;
                }

                return returnObject;
            }
            catch (Exception excp)
            {
                returnObject.Results.Add(new Result("", excp.Message));
                return returnObject;
            }
        }

        public static GenericResponse<int?> InsertUrl(Urls urlsModel)
        {
            GenericResponse<int?> returnObject = new GenericResponse<int?>();
            try
            {

                using (var connection = new SqliteConnection(_connectionString))
                {
                    connection.Open();

                    string insertUserSql = @"INSERT INTO urls(InsertDate, url, user_definition_id,scheduletime)
                        VALUES(@InsertDate, @url, @user_definition_id, @scheduletime);SELECT rowid FROM user_definition order by 1 desc limit 1;";

                    int newUserId = connection.QuerySingle<int>(
                                        insertUserSql,
                                        new
                                        {
                                            InsertDate = urlsModel.InsertDate,
                                            url= urlsModel.url,
                                            user_definition_id = urlsModel.userDefinitionId,
                                            scheduletime = urlsModel.scheduletime
                                        }
                                        );

                    returnObject.Value = newUserId;
                }

                return returnObject;
            }
            catch (Exception excp)
            {
                returnObject.Results.Add(new Result("", excp.Message));
                return returnObject;
            }
        }

         public static GenericResponse<int?> InsertHealthCheckUrl( HealthCheckUrl healthCheckUrl)
        {
            GenericResponse<int?> returnObject = new GenericResponse<int?>();
            try
            {

                using (var connection = new SqliteConnection(_connectionString))
                {
                    connection.Open();

                    string insertUserSql = @"INSERT INTO HealthCheckURL(InsertDate, url_id, status,screenshot,response_time)
                        VALUES(@InsertDate, @url_id, @status, @screenshot,@response_time);SELECT rowid FROM user_definition order by 1 desc limit 1;";

                    int newUserId = connection.QuerySingle<int>(
                                        insertUserSql,
                                        new
                                        {
                                            InsertDate = healthCheckUrl.InsertDate,
                                            url_id= healthCheckUrl.urlId,
                                            status = healthCheckUrl.status,
                                            screenshot = healthCheckUrl.screenShot,
                                            response_time=healthCheckUrl.responseTime
                                        }
                                        );

                    returnObject.Value = newUserId;
                }

                return returnObject;
            }
            catch (Exception excp)
            {
                returnObject.Results.Add(new Result("", excp.Message));
                return returnObject;
            }
        }
    }
}
