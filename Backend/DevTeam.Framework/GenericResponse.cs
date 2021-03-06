using System.Collections.Generic;

namespace DevTeam.Framework
{
    public class GenericResponse<T> : ResponseBase
    {
        public T Value { get; set; }

    }

    public class Result
    {
        public Result(string errorCode, string errorMessage)
        {
            ErrorCode = errorCode;
            ErrorMessage = errorMessage;
        }

        public string ErrorCode { get; set; }
        public string ErrorMessage { get; set; }
    }

    public class ResponseBase
    {
        public List<Result> Results=new List<Result>();

        private bool _isSuccess;
        public bool IsSuccess
        {
            get{ return Results != null && Results.Count > 0?false:true;}

            set => _isSuccess = value;
        }

    }
}
