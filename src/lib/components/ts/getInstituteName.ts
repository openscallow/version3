/**
 * @File_Meta_data
 * 
 * Created by: Gautam mer (CEO)
 * Created at: 12/10/2025
 * 
 * Last edit by: Gautam mer (CEO)
 * Edited at: 12/10/2025
 * Last change: Refactored the institute_name initialization logic to ensure compatibility with non-browser environments (e.g., server-side rendering).
 * 
*/

let institute_name = typeof window !== 'undefined' ? localStorage.getItem('institute_name'): null;
export { institute_name }