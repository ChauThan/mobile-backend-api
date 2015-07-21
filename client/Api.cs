using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using RestSharp;

namespace client
{
    public class Api
    {
        private string _url = ConfigurationManager.AppSettings["UrlApi"];

        public User User { get; set; }

        public Api()
        {
            ServicePointManager.ServerCertificateValidationCallback += (sender, certificate, chain, sslPolicyErrors) => true;
        }

        public bool Register(string user, string password)
        {
            // hash password
            var data = Encoding.ASCII.GetBytes(password);
            var sha1 = new SHA1CryptoServiceProvider();
            var sha1Password = sha1.ComputeHash(data);

            var client = new RestClient(_url);
            var request = new RestRequest("regist", Method.POST);
            request.AddParameter("username", user);
            request.AddParameter("password", Convert.ToBase64String(sha1Password));

            var response = client.Execute<User>(request);
            Console.WriteLine(response.Content);
            User = response.Data;
            return User.Token != null;
        }

        public bool Login(string user, string password)
        {
            // hash password
            var data = Encoding.ASCII.GetBytes(password);
            var sha1 = new SHA1CryptoServiceProvider();
            var sha1Password = sha1.ComputeHash(data);

            var client = new RestClient(_url);
            var request = new RestRequest("login", Method.POST);
            request.AddParameter("username", user);
            request.AddParameter("password", Convert.ToBase64String(sha1Password));

            var response = client.Execute<User>(request);
            Console.WriteLine(response.Content);

            User = response.Data;
            return User.Token != null;
        }

        public void GetTexts()
        {
            var client = new RestClient(_url);
            var request = new RestRequest("api/texts", Method.GET);
            request.AddHeader("x-access-token", User.Token);

            var response = client.Execute(request);
            Console.WriteLine(response.Content);
        }

        public void GetText(int id)
        {
            var client = new RestClient(_url);
            var request = new RestRequest("api/text/{id}", Method.GET);
            request.AddHeader("x-access-token", User.Token);

            request.AddUrlSegment("id", id.ToString());

            var response = client.Execute(request);
            Console.WriteLine(response.Content);
        }

        public void CreateText(string text)
        {
            var client = new RestClient(_url);
            var request = new RestRequest("api/text", Method.POST);
            request.AddHeader("x-access-token", User.Token);

            request.AddParameter("text", text);

            var response = client.Execute(request);
            Console.WriteLine(response.Content);
        }

        public void UpdateText(int id, string text)
        {
            var client = new RestClient(_url);
            var request = new RestRequest("api/text/{id}", Method.PUT);
            request.AddHeader("x-access-token", User.Token);

            request.AddUrlSegment("id", id.ToString());
            request.AddParameter("text", text);

            var response = client.Execute(request);
            Console.WriteLine(response.Content);
        }

        public void DeleteText(int id)
        {
            var client = new RestClient(_url);
            var request = new RestRequest("api/text/{id}", Method.DELETE);
            request.AddHeader("x-access-token", User.Token);

            request.AddUrlSegment("id", id.ToString());

            var response = client.Execute(request);
            Console.WriteLine(response.Content);
        }
    }

    public class User
    {
        public string Token { get; set; }
    }
}