"use client";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface BlogFiltersProps {
    onSearch: (value: string) => void;
    onSort: (value: string) => void;
}

export function BlogFilters({ onSearch, onSort }: BlogFiltersProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    placeholder="Search posts..."
                    onChange={(e) => onSearch(e.target.value)}
                    className="pl-10"
                />
            </div>
            <Select onValueChange={onSort} defaultValue="newest">
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="views">Most Views</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
} 