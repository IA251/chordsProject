using Common.DTO_s;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Servies.Interfaces
{
    public interface IServices<T>
    {
        Task<List<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id, string transpose,string ordersWords);
        Task<string> GetEasyByIdAsync(int id);
        void AddAsync(T entity);
        void UpdateAsync(int id,T entity);
        void DeleteAsync(int id);
    }
}
