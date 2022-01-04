using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using DevTeam.Framework;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Mobile.ApiGateway.Models.Customs;
using Mobile.ApiGateway.Models.Entities;

namespace Mobile.ApiGateway.Controllers
{
    [ApiController]
    //[Route("[controller]")]

    [Route("[controller]/[action]")]
    [EnableCors("_myAllowSpecificOrigins")]
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        //private readonly IConfiguration _configuration;
        //private readonly string _connectionString;
        private readonly UserDefinition _userDefinitionRepository;
        private readonly UserReference _userReferenceRepository;
        private int _authUserId;
        private UserType _authUserType;
        private string _authUserCode;


        public LoginController(IConfiguration configuration, IHttpContextAccessor accessor)
        {
            IEnumerable<Claim> userClaims = accessor?.HttpContext?.User?.Identities.FirstOrDefault()?.Claims;
            SetUserClaims(userClaims);

            _userDefinitionRepository = new UserDefinition();
            _userReferenceRepository = new UserReference();
            //_configuration = configuration;
            //_connectionString = _configuration.GetConnectionString("DefaultConnection");

        }

        private void SetUserClaims(IEnumerable<Claim> userClaims)
        {
            if (userClaims == null) return;

            foreach (Claim userClaim in userClaims)
            {
                switch (userClaim.Type)
                {
                    case "UserId":
                        if (!string.IsNullOrEmpty(userClaim.Value))
                            _authUserId = int.Parse(userClaim.Value);
                        break;
                    case "UserType":
                        if (!string.IsNullOrEmpty(userClaim.Value))
                            _authUserType = (UserType)int.Parse(userClaim.Value);
                        break;
                    case "UserCode":
                        if (!string.IsNullOrEmpty(userClaim.Value))
                            _authUserCode = userClaim.Value;
                        break;
                }
            }
        }

        [HttpPost]
        public ActionResult<GenericResponse<SignInResponseModel>> SignIn([FromBody] SignInRequestModel signInRequestModel)
        {
            GenericResponse<SignInResponseModel> returnObject = new GenericResponse<SignInResponseModel>();
            const string pleaseCheckUserOrPassword = "Please check your mail or password";

            if (signInRequestModel == null || string.IsNullOrEmpty(signInRequestModel.Mail.Trim()) || string.IsNullOrEmpty(signInRequestModel.Password.Trim()))
            {
                returnObject.Results.Add(new Result("E00037", pleaseCheckUserOrPassword));
                return new ActionResult<GenericResponse<SignInResponseModel>>(returnObject);
            }


            UserDefinition user = _userDefinitionRepository.GetList<UserDefinition>(new { Mail = signInRequestModel.Mail }).FirstOrDefault();
            if (user != null)
            {
                string password = signInRequestModel.Password;
                if (user.Password == password)
                {
                    string plainText = $"{signInRequestModel.Mail}:{signInRequestModel.Password}:EnBuyukGalatasaray:{DateTime.Now}";
                    user.Token = Base64Helper.Base64Encode(plainText);

                    returnObject.Value = new SignInResponseModel() { Token = user.Token, HashCode = user.HashCode };
                    _userDefinitionRepository.Update(user);
                    return new ActionResult<GenericResponse<SignInResponseModel>>(returnObject);
                }

            }

            returnObject.Results.Add(new Result("E00038", pleaseCheckUserOrPassword));
            return new ActionResult<GenericResponse<SignInResponseModel>>(returnObject);

        }

        [HttpPost]
        public IActionResult SignUp([FromBody] UserDefinition userDefinitionModel)
        {
            GenericResponse<string> returnObject = new GenericResponse<string>();
            UserDefinition user = _userDefinitionRepository.GetList<UserDefinition>(new { Mail = userDefinitionModel.Mail }).FirstOrDefault();
            if (user != null)
            {
                returnObject.Results.Add(new Result("E00001", "Bu mail adresiyle başka kayıt var"));
                return BadRequest(returnObject);
            }

            string userCode = GenerateUserCode();
            userDefinitionModel.InsertDate = DateTime.Now;
            userDefinitionModel.Code = userCode;

            string plainText = $"{userDefinitionModel.Mail}:{userDefinitionModel.Name}:EnBuyukGalatasaray:{userDefinitionModel.InsertDate}";
            userDefinitionModel.HashCode = GetInt32HashCode(plainText).ToString();
            GenericResponse<int?> saveResponse = _userDefinitionRepository.Save(userDefinitionModel);
            if (!saveResponse.IsSuccess || saveResponse.Value == null)
            {
                return BadRequest(userDefinitionModel);
            }

            if (!string.IsNullOrEmpty(userDefinitionModel.ReferenceCode))
            {
                UserDefinition referencedUser = _userDefinitionRepository.GetList<UserDefinition>(new { Code = userDefinitionModel.ReferenceCode }).FirstOrDefault();
                if (referencedUser == null)
                {
                    returnObject.Results.Add(new Result("E00002", "Bu referans numaralı user bulunamadı"));
                    return BadRequest(returnObject);
                }

                //todo : validReference için method yazmak gerekir.
                bool validReference = userDefinitionModel.UserType < referencedUser.UserType;
                if (!validReference)
                {
                    returnObject.Results.Add(new Result("E00003", "Bu kullanıcı size referans olamaz."));
                    return BadRequest(returnObject);
                }

                UserReference userReference = new UserReference();
                userReference.ReferenceCode = userDefinitionModel.Code;
                userReference.UserId = (int)saveResponse.Value;
                GenericResponse<int?> genericResponse = _userReferenceRepository.Save(userReference);


                //todo : 
                //referencode ile user bul yoksa hata fırlat
                //userDefinitionModel userType al
                // referenceode ile user accountType al
                //userın account type kaydedilecek user için uygun mu ? değilse bu user size referans olamaz. 
                //uygunsa
            }


            return Ok(userDefinitionModel);

            //{ userName: userName,email: email,password: password,social: { instagram: instagram,linkedin: linkedin,twitter: twitter},profilePhoto: profilePhoto}


        }


        private string GenerateUserCode()
        {
            Random r = new Random();
            string userCode = "";
            for (int i = 0; i < 8; i++)
            {
                int a = r.Next(2);
                int character;
                switch (a)
                {
                    case 0: // rakam 
                        character = r.Next(0, 9);
                        userCode = userCode + character.ToString();
                        break;
                    case 1: // buyuk harf
                        character = r.Next(65, 90);
                        userCode = userCode + Convert.ToChar(character).ToString();
                        break;
                    //case 2: // kucuk harf
                    //    character = r.Next(97, 122);
                    //    s = s + Convert.ToChar(character).ToString();
                    //    break;
                }
            }

            UserDefinition checkUserCode = _userDefinitionRepository.GetList<UserDefinition>(new { Code = userCode }).FirstOrDefault();
            if (checkUserCode != null)
            {
                return GenerateUserCode();
            }

            return userCode;
        }
        //
        //todo : sign in service
        //sign -up
        //get servisi hash code a göre 
        //user id ye göre get
        //billing hash code + user id ile olacak

        [HttpPost]
        //[HttpPost("~/connect/token"), Produces("application/json")]
        [BasicAuthorization]
        public ActionResult<UserDefinition> GetUserByUserId([FromBody] int userId)
        {
            //return LoginController.DummyGetUserByUserId(userId);
            return _userReferenceRepository.Get<UserDefinition>(userId);

        }

        [HttpPost]
        [EnableCors("_myAllowSpecificOrigins")]
        [BasicAuthorization]
        public ActionResult<UserDefinition> GetUserByHashCode([FromBody] string hashCode)
        {
            //return LoginController.DummyGetUserByUserId(1);
            return _userReferenceRepository.GetList<UserDefinition>(new { HashCode = hashCode }).FirstOrDefault();

        }

        private static ActionResult<UserDefinition> DummyGetUserByUserId(int userId)
        {
            UserDefinition userDefinition = new UserDefinition();
            userDefinition.Id = userId;
            userDefinition.InsertDate = DateTime.Now;
            userDefinition.Name = "Sami";
            userDefinition.Surname = "Dulger";
            userDefinition.Instagram = "samidulger@instagram.com";
            userDefinition.LinkedIn = "samidulger@linkedin.com";
            userDefinition.Mail = "sami_dulger@hotmail.com";
            userDefinition.ReferenceCode = "Sd3738";
            userDefinition.IsVerify = true;
            userDefinition.HashCode = "123456";
            userDefinition.Password = "12345sd";
            userDefinition.Twitter = "https://twitter.com/samidulger";
            userDefinition.UserType = UserType.Diamond;
            userDefinition.Image =
                "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";
            userDefinition.Profit = (decimal)500.15;
            return new ActionResult<UserDefinition>(userDefinition);
        }

        private static int GetInt32HashCode(string strText)
        {
            var hashCode = 0;
            if (!string.IsNullOrEmpty(strText))
            {
                //Unicode Encode Covering all characterset
                var byteContents = Encoding.Unicode.GetBytes(strText);
                System.Security.Cryptography.SHA256 hash = new System.Security.Cryptography.SHA256CryptoServiceProvider();
                var hashText = hash.ComputeHash(byteContents);
                var hashCodeStart = BitConverter.ToInt32(hashText, 0);
                var hashCodeMedium = BitConverter.ToInt32(hashText, 8);
                var hashCodeEnd = BitConverter.ToInt32(hashText, 24);
                hashCode = hashCodeStart ^ hashCodeMedium ^ hashCodeEnd;
            }
            return (hashCode);
        }

        //[HttpPost]
        //public IActionResult LogOut()
        //{
        //    //token null 
        //    UserDefinition userDefinition = new UserDefinition();

        //    //GenericResponse<int?> saveResponse = userDefinition.Save(userDefinitionModel);
        //    //if (!saveResponse.IsSuccess)
        //    //{
        //    //    return BadRequest(userDefinitionModel);
        //    //}
        //    //return Ok(userDefinitionModel);


        //}



        [HttpPost]
        [BasicAuthorization]
        public ActionResult<GenericResponse<BillingResponseModel>> BillingHashCode()
        {
            GenericResponse<BillingResponseModel> returnObject = new GenericResponse<BillingResponseModel>();

            BillingResponseModel billingResponseModel = CalculateProfit();
            if (billingResponseModel == null)
            {
                returnObject.Results.Add(new Result("E00007", "Hesaplama yapılırken hata alındı"));
                return BadRequest(returnObject);
            }

            returnObject.Value = billingResponseModel;
            return new ActionResult<GenericResponse<BillingResponseModel>>(returnObject);
        }

        private BillingResponseModel CalculateProfit()
        {

            double profit = 0;
            BillingResponseModel billingResponseModel = null;
            IEnumerable<UserReference> userReferences = _userReferenceRepository.GetList<UserReference>(new { ReferenceCode = _authUserCode });

            List<BillingUserModel> billingUserModelList = new List<BillingUserModel>();
            foreach (UserReference userReference in userReferences)
            {
                double amount = 0;
                UserDefinition userDefinition = _userDefinitionRepository.Get<UserDefinition>(userReference.UserId);
                if (userDefinition != null)
                {
                    amount = userDefinition.UserType switch
                    {
                        UserType.Diamond => 999.99 * 0.5,
                        UserType.Gold => 499.99 * 0.25,
                        UserType.Silver => 99.99 * 0.1,
                        UserType.Bronze => 10.99 * 0.05,
                        _ => amount
                    };

                    BillingUserModel billingUserModel = new BillingUserModel
                    {
                        Name = userDefinition.Name,
                        Surname = userDefinition.Surname,
                        UserType = userDefinition.UserType,
                        InsertDate = userDefinition.InsertDate,
                        PaidDate = userDefinition.InsertDate.AddMonths(1).Date,
                        Price = amount
                    };
                    billingUserModelList.Add(billingUserModel);
                    profit += amount;
                }


            }

            if (billingUserModelList.Count > 0)
            {
                billingResponseModel = new BillingResponseModel
                {
                    BillingUserModelList = billingUserModelList,
                    TotalPrice = profit
                };
            }


            //referenceCode ile refereans olunan userları çek
            //    çektiğin listeyi döngüye sok
            //        referans olunan userın tipi diamondsa(1000);
            //authuser.accountType  == diamondsa()
            //{
            //    1000 * 0.5
            //}
            //authuser.accountType == gold()
            //{
            //    1000 * 0.25
            //}
            //authuser.accountType == silver()
            //{
            //    1000 * 0.1
            //}
            //authuser.accountType == gold()
            //{
            //    amount = 1000 * 0.05
            //}

            //referans olunan userın
            //    adi
            //    account tipi
            //    insert time
            //    paid date = insert time + 1 ay
            //    price = amount
            //    profit += amount;


            return billingResponseModel;
        }

        //[HttpGet]
        //public ActionResult<IEnumerable<UserDefinition>> GetUser()
        //{

        //    IEnumerable<UserDefinition> userDefinitions = new List<UserDefinition>();

        //    using (var conn = new MySqlConnection(_connectionString))
        //    {
        //        conn.Open();

        //        userDefinitions = conn.Query<UserDefinition>("SELECT * FROM USER_DEFINITION ORDER BY Id");

        //    }
        //    return new ActionResult<IEnumerable<UserDefinition>>(userDefinitions);

        //}


        // Belli bir şehirdeki firmaların bilgilerini döndüren metodumuz
        //[HttpGet("{city}")]
        //public ActionResult<IEnumerable<Firm>> GetByCity(string city)
        //{
        //    IEnumerable<Firm> firms = new List<Firm>();
        //    // SQLite connection nesnesini oluştur
        //    using (var conn = new SQLiteConnection(conStr))
        //    {
        //        conn.Open(); // bağlantıyı aç
        //        // Bu kez işin içerisinde bir where koşulu var
        //        firms = conn.Query<Firm>("SELECT * FROM FIRM WHERE CITY = @FirmCity ORDER BY NAME", new { FirmCity = city });

        //    }
        //    return new ActionResult<IEnumerable<Firm>>(firms);
        //}

        //[HttpPost]
        //public IActionResult Post([FromBody] Firm payload)
        //{
        //    try
        //    {
        //        using (var conn = new SQLiteConnection(conStr))
        //        {
        //            conn.Open(); // bağlantıyı aç
        //            // INSERT cümleciğini çalıştır
        //            // ikinci parametreye dikkat. Burada APIye talebin bodysi ile gelen JSON içeriğini kullanıyoruz.
        //            conn.Execute(@"INSERT INTO FIRM (ID,NAME,CITY,SALARY) VALUES (@ID,@NAME,@CITY,@SALARY)", payload);
        //            return Ok(payload);
        //        }
        //    }
        //    catch (SQLiteException excp) // Olası bir SQLite exception durumunda HTTP 400 Bad Request hatası verip içerisine exception mesajını gömüyoruz
        //    {
        //        return BadRequest(excp.Message); //Bunu production ortamlarında yapmayın. Loglama yapın başka bir mesaj verin. Exception içerisinde koda ve sorguya dair ipuçları olabilir.
        //    }
        //}

        //// Güncelleme işlemleri için kullanacağımız metot
        //[HttpPut()]
        //public IActionResult Put([FromBody] Firm payload)
        //{
        //    try
        //    {
        //        using (var conn = new SQLiteConnection(conStr))
        //        {
        //            conn.Open(); // bağlantıyı aç
        //                         // UPDATE cümleciğini çalıştır
        //                         // Parametreler diğer metodlarda olduğu gibi @ sembolü ile başlayan kelimelerden oluşuyor
        //                         // Bu parametrelere değer atarken anonymous type de kullanabiliyoruz.

        //            //TODO Aslında gelen JSON içeriğinde hangi alanlar varsa sadece onları güncellemeye çalışalım
        //            var result = conn.Execute(@"UPDATE FIRM SET NAME=@firmName,CITY=@firmCity,SALARY=@firmSalary WHERE ID=@firmId",
        //                new
        //                {
        //                    firmName = payload.Name,
        //                    firmCity = payload.City,
        //                    firmSalary = payload.Salary,
        //                    firmId = payload.ID
        //                });
        //            if (result == 1)
        //                return Ok(payload); // Eğer güncelleme sonucu 1 ise (ki ID bazlı güncelleme olduğundan 1 dönmesini bekliyoruz) HTTP 200
        //            else
        //                return NotFound(); // ID değerinde bir firma yoksa HTTP 404
        //        }
        //    }
        //    catch (SQLiteException excp) // Olası bir SQLite exception durumunda HTTP 400 Bad Request hatası verip içerisine exception mesajını gömüyoruz
        //    {
        //        return BadRequest(); // HTTP 400 
        //    }
        //}

        //// Silme operasyonları için çalışan metot
        //[HttpDelete("{id}")]
        //public IActionResult Delete(int id)
        //{
        //    using (var conn = new SQLiteConnection(conStr))
        //    {
        //        conn.Open(); // bağlantıyı aç
        //        var result = conn.Execute(@"DELETE FROM FIRM WHERE ID=@firmId", new { firmId = id });
        //        if (result == 1)
        //            return Ok(); // Eğer silme operasyonu başarılı ise etkilenen kayıt sayısı (ki bu senaryoda 1 bekliyoruz) 1 döner HTTP 200
        //        else
        //            return NotFound(); // Aksi durumda bu ID de bir kayıt yoktur diyebiliriz. HTTP 404
        //    }

        //}
    }
}
