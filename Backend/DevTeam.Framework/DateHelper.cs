
using System;

namespace DevTeam.Framework
{
    public class DateHelper
    {
        public static DateTime GetLocalDate(DateTime date)
        {
            try
            {
                return (date.Kind != DateTimeKind.Utc) ? TimeZoneInfo.ConvertTimeToUtc(date, TimeZoneInfo.Utc) : date;

            }
            catch (Exception)
            {
                return DateTime.Now;
            }
        }
    }
}
