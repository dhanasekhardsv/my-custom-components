import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Mail, Phone, MapPin, Briefcase, Search, ArrowUpDown } from 'lucide-react';
import empList from '../utils/employees.json';

const PaginatedEmpList = () => {
    const data = empList;

    // State
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [salaryRange, setSalaryRange] = useState({ min: '', max: '' });

    // Filtering and Sorting Logic
    const filteredAndSortedData = useMemo(() => {
        let processedData = [...data];

        // Apply search
        if (searchTerm) {
            processedData = processedData.filter(employee =>
                employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.job_title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply salary filter
        if (salaryRange.min || salaryRange.max) {
            processedData = processedData.filter(employee => {
                const aboveMin = !salaryRange.min || employee.salary >= Number(salaryRange.min);
                const belowMax = !salaryRange.max || employee.salary <= Number(salaryRange.max);
                return aboveMin && belowMax;
            });
        }

        // Apply sorting
        if (sortConfig.key) {
            processedData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key])
                    return sortConfig.direction === 'asc' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key])
                    return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return processedData;
    }, [data, searchTerm, sortConfig, salaryRange]);

    // Pagination calculation
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const currentRecords = filteredAndSortedData.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredAndSortedData.length / recordsPerPage);

    // Sort handler
    const handleSort = (key) => {
        setSortConfig(current => ({ key, direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc' }));
        setCurrentPage(1);
    };

    // Get page numbers logic
    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('...');
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);
            if (currentPage <= 3) end = 4;
            if (currentPage >= totalPages - 2) start = totalPages - 3;
            for (let i = start; i <= end; i++) pages.push(i);
            if (currentPage < totalPages - 2) pages.push('...');
            if (totalPages > 1) pages.push(totalPages);
        }
        return pages;
    };

    // Utility functions
    const formatSalary = (salary) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(salary);
    };

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleRecordsPerPageChange = (e) => {
        setRecordsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const getImagePath = (photoName) => {
        return require(`../assets/images/${photoName}`);
      };

    return (
        <div className="w-full max-w-6xl mx-auto p-4">
            {/* Controls and Filters */}
            <div className="mb-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Employee Directory</h2>
                    <div className="flex items-center gap-2">
                        <label htmlFor="recordsPerPage" className="text-sm font-medium">
                            Employees per page:
                        </label>
                        <select id="recordsPerPage" value={recordsPerPage} onChange={handleRecordsPerPageChange} className="border rounded p-1">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-wrap gap-4">
                    {/* Search */}
                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input type="text" placeholder="Search by name or job title..." value={searchTerm} className="w-full pl-10 pr-4 py-2 border rounded"
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }} />
                        </div>
                    </div>

                    {/* Salary Range Filter */}
                    <div className="flex gap-2 items-center">
                        <input type="number" placeholder="Min Salary" value={salaryRange.min} className="w-28 px-3 py-2 border rounded"
                            onChange={(e) => {
                                setSalaryRange(prev => ({ ...prev, min: e.target.value }));
                                setCurrentPage(1);
                            }} />
                        <span>to</span>
                        <input type="number" placeholder="Max Salary" value={salaryRange.max} className="w-28 px-3 py-2 border rounded"
                            onChange={(e) => {
                                setSalaryRange(prev => ({ ...prev, max: e.target.value }));
                                setCurrentPage(1);
                            }} />
                    </div>

                    {/* Sort Buttons */}
                    <div className="flex gap-2">
                        <button onClick={() => handleSort('name')}
                            className={`px-3 py-2 border rounded flex items-center gap-1 ${sortConfig.key === 'name' ? 'bg-blue-50' : ''}`}>
                            Name
                            <ArrowUpDown className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleSort('salary')}
                            className={`px-3 py-2 border rounded flex items-center gap-1 ${sortConfig.key === 'salary' ? 'bg-blue-50' : ''}`}>
                            Salary
                            <ArrowUpDown className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Employee cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {currentRecords.map((employee) => (
                    <div key={employee.id} className="border rounded-lg p-4 flex gap-4 bg-white shadow-sm">
                        <div className="flex-shrink-0 flex items-center">
                            <img src={getImagePath(employee.profile_picture)} alt={employee.name} className="w-24 rounded-full object-cover" />
                        </div>
                        <div className="flex-grow space-y-2">
                            <h3 className="font-semibold text-lg">{employee.name}</h3>
                            <p className="text-gray-600 flex items-center gap-1 text-sm">
                                <Briefcase className="h-4 w-4" />
                                {employee.job_title}
                            </p>
                            <p className="text-gray-600 flex items-center gap-1 text-sm">
                                <Mail className="h-4 w-4" />
                                {employee.email}
                            </p>
                            <p className="text-gray-600 flex items-center gap-1 text-sm">
                                <Phone className="h-4 w-4" />
                                {employee.phone}
                            </p>
                            <p className="text-gray-600 flex items-center gap-1 text-sm">
                                <MapPin className="h-4 w-6" />
                                {employee.address}
                            </p>
                            <p className="mt-2 font-medium">
                                Salary: <span className="text-green-600">{formatSalary(employee.salary)}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show "No results found" message when filtered data is empty */}
            {filteredAndSortedData.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No employees found matching your criteria
                </div>
            )}

            {/* Pagination controls */}
            {filteredAndSortedData.length > 0 && (
                <div className="flex items-center justify-between border-t pt-4">
                    <div className="text-sm text-gray-600">
                        Showing {firstIndex + 1} to {Math.min(lastIndex, filteredAndSortedData.length)} of {filteredAndSortedData.length} employees
                    </div>

                    <div className="flex items-center gap-1">
                        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous page"
                            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50">
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        {getPageNumbers().map((number, index) => (
                            number === '...' ? <span key={`ellipsis-${index}`} className="px-3 py-1">...</span> :
                                (
                                    <button key={number} onClick={() => paginate(number)}
                                        className={`px-3 py-1 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}>
                                        {number}
                                    </button>
                                )
                        ))}

                        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Next page"
                            className="p-1 rounded hover:bg-gray-100 disabled:opacity-50">
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PaginatedEmpList