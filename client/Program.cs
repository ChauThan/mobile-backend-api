using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace client
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            var api = new Api();

            int userInput = 0;
            var menuCount = 0;
            do
            {
                menuCount = api.User == null || api.User.Token == null ? 3 : 6;
                if (api.User == null || api.User.Token == null)
                {
                    switch (userInput)
                    {
                        case 1:
                            Console.Write("Username: ");
                            var username = Console.ReadLine();
                            Console.Write("Password: ");
                            var password = Console.ReadLine();
                            api.Login(username, password);
                            break;
                        case 2:
                            Console.Write("Username: ");
                            username = Console.ReadLine();
                            Console.Write("Password: ");
                            password = Console.ReadLine();
                            api.Register(username, password);
                            break;
                        default:
                            break;
                    }
                }
                else
                {
                    switch (userInput)
                    {
                        case 1:
                            api.GetTexts();
                            break;
                        case 2:
                            Console.Write("Text Id: ");
                            var id = Console.ReadLine();
                            api.GetText(Convert.ToInt32(id));
                            break;
                        case 3:
                            Console.Write("Text: ");
                            var text = Console.ReadLine();
                            api.CreateText(text);
                            break;
                        case 4:
                            Console.Write("Text Id: ");
                            id = Console.ReadLine();
                            Console.Write("Text: ");
                            text = Console.ReadLine();
                            api.UpdateText(Convert.ToInt32(id), text);
                            break;
                        case 5:
                            Console.Write("Text Id: ");
                            id = Console.ReadLine();
                            api.DeleteText(Convert.ToInt32(id));
                            break;
                        default:
                            break;
                    }
                }

                userInput = DisplayMenu(api.User);
            } while (userInput != menuCount);
        }

        private static int DisplayMenu(User user)
        {
            var index = 1;
            Console.WriteLine("Mobile Api Client");
            Console.WriteLine();
            if (user == null || user.Token == null)
            {
                Console.WriteLine(index++ + ". Login");
                Console.WriteLine(index + ". Register");
            }
            else
            {
                Console.WriteLine(index++ + ". Get All Text");
                Console.WriteLine(index++ + ". Get Text");
                Console.WriteLine(index++ + ". Create Text");
                Console.WriteLine(index++ + ". Update Text");
                Console.WriteLine(index++ + ". Delete Text");
                Console.WriteLine(index + ". Exit");
            }
            
            var result = Console.ReadLine();

            return Convert.ToInt32(result);
        }
    }
}