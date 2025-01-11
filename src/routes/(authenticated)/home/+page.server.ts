import { Fail } from '$lib/utils';
import { redirect } from '@sveltejs/kit';

export async function load({url, locals: { supabase, getSession }}){
    const searchText = url.searchParams.get('search')?.trim() || '';
    const page = parseInt(url.searchParams.get('page') || '1', 10) ?? 1;
    const itemsPerPage = 10; // Customize as needed
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;
    const session = await getSession();
    let query =  supabase
        .from('expenses')
        .select('*', { count: "exact" })
        .eq('user_id', session?.user.id)
        .order('created_at', { ascending: false })
        .range(from, to);
    if (searchText) {
        query = query.ilike('activity', `%${searchText}%`); // Replace 'column_name' with your column name
    }
    const { data:expenses, error, count } = await query;
    const totalPages = Math.ceil((count ?? 0) / itemsPerPage);
    if(page > totalPages){
        throw redirect(303,'?page='+ totalPages);
    }
    const totalPagesArr = () => {
        let i = 1;
        let arr = [];
        while(i <= totalPages){
          arr.push(i);
          i++;
        }
        return arr;
    };
    return { expenses, 
        currentPage: page,
        itemsPerPage,
        totalItems: count,
        totalPagesArr: totalPagesArr()
    };
}


export const actions = {
    add: async ({request, locals: {supabase, getSession}}) =>{
        const data = await request.formData();
        const session = await getSession();
        const activity = data.get('activity');
        const amount = data.get('amount');
        if(!activity || !amount){
            return Fail({
                message: 'Please provide all required fields'
              })
        }
        const { data:res, error } = await supabase
              .from('expenses')
              .insert([{ activity: activity, amount, user_id: session?.user.id }]);
        return {status:200, message:'Successfully Added'};
    },
    update: async ({request, locals: {supabase, getSession}}) =>{
        const data = await request.formData();
        const session = await getSession();
        const id = data.get('id');
        const activity = data.get('activity');
        const amount = data.get('amount');
        if(!id || !activity || !amount){
            return Fail({
                message: 'Please provide all required fields'
              })
        }
        const { data:res, error } = await supabase
        .from('expenses')
        .upsert({ id, activity, amount, user_id: session?.user.id })
        .select();

        return {status:200, message:'Successfully Updated'};
    },
    delete: async ({request, locals: {supabase, getSession}}) => {
        
        const data = await request.formData();
        const session = await getSession();
        const id = data.get('id');
        if(!id){
            return Fail({
                message: 'Please provide all required fields'
              })
        }
        const { data:res, error } = await supabase
              .from('expenses')
              .delete()
              .eq('id', id)
               

        if(error){
            return Fail({
                message: error.message
            });
        }
        else {
            return {status:200, message:'Successfully Deleted'};
        }
    },

}