import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export default function ProjectForm({
  formData = {},
  onSubmit,
}: {
  formData?: {
    name?: string;
    description?: string;
    status?: string;
  };
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4">
        {/* Name */}
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter project name"
            defaultValue={formData.name}
          />
        </div>

        {/* Description */}
        <div className="grid gap-3">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe your project..."
            defaultValue={formData.description}
          />
        </div>

        {/* Status */}
        <div className="grid gap-3">
          <Label htmlFor="status">Status</Label>
          <Select defaultValue={formData.status} name="status">
            <SelectTrigger id="status">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="planned">Planned</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </form>
  );
}
