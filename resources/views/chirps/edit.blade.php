<x-layout>
  <x-slot:title>
    Edit Chirp
  </x-slot:title>

  <!-- Chirp Form -->
  <div class="card bg-base-100 shadow mt-8">
    <div class="card-body">
      <form method="POST" action="/chirps/{{ $chirp->id }}">
        @method('PUT')
        @csrf
        <div class="form-control w-full">
          <textarea name="message" 
                    placeholder="What's on your mind?"
                    class="textarea textarea-bordered w-full resize-none @error('message') textarea-error @enderror rows=" 4"
                    maxlength="255" required
                    >{{ old('message', $chirp->message) }}</textarea>
          @error('message')
            <div class="label">
              <span class="label-text-alt text-error">{{ $message }}</span>
            </div>
          @enderror
        </div>
  
        <div class="mt-4 flex items-center justify-end">
          <button type="submit" class="btn btn-primary btn-sm">
            Update Chirp
          </button>
        </div>
      </form>
    </div>
  </div>
</x-layout>